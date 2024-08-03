library(shiny)
library(ggplot2)
library(DT)
library(rmarkdown)

server <- function(input, output) {
  data <- reactive({
    req(input$file1)
    read.csv(input$file1$datapath, header = input$header, sep = input$sep, quote = input$quote)
  })
  
  output$plot1 <- renderPlot({
    req(data())
    ggplot(data(), aes(x = factor(1), fill = factor(1))) +
      geom_bar() +
      theme_minimal()
  })
  
  output$table1 <- renderDT({
    req(data())
    datatable(data())
  })
  
  output$downloadPlot <- downloadHandler(
    filename = function() {
      paste("plot", Sys.Date(), ".html", sep = "")
    },
    content = function(file) {
      tempReport <- file.path(tempdir(), "report.Rmd")
      file.copy("report.Rmd", tempReport, overwrite = TRUE)
      
      params <- list(plot = ggplot(data(), aes(x = factor(1), fill = factor(1))) +
                       geom_bar() +
                       theme_minimal())
      
      rmarkdown::render(tempReport, output_file = file, params = params, envir = new.env(parent = globalenv()))
    }
  )
  
  output$downloadData <- downloadHandler(
    filename = function() {
      paste("data", Sys.Date(), ".csv", sep = "")
    },
    content = function(file) {
      write.csv(data(), file)
    }
  )
}