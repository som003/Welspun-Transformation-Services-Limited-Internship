library(shiny)
library(shinydashboard)
library(DT)

ui <- dashboardPage(
  dashboardHeader(title = "Power BI-like App"),
  dashboardSidebar(
    sidebarMenu(
      menuItem("Dashboard", tabName = "dashboard", icon = icon("dashboard")),
      menuItem("Upload Data", tabName = "upload", icon = icon("upload"))
    )
  ),
  dashboardBody(
    tabItems(
      tabItem(tabName = "dashboard",
              fluidRow(
                box(title = "Plot", status = "primary", solidHeader = TRUE, collapsible = TRUE,
                    plotOutput("plot1", height = 250)),
                box(title = "Download", status = "primary", solidHeader = TRUE, collapsible = TRUE,
                    downloadButton("downloadPlot", "Download Plot as HTML"),
                    downloadButton("downloadData", "Download Data as CSV"))
              ),
              fluidRow(
                box(title = "Data Table", status = "primary", solidHeader = TRUE, collapsible = TRUE,
                    DTOutput("table1"))
              )
      ),
      tabItem(tabName = "upload",
              fileInput("file1", "Choose CSV File", accept = c("text/csv", "text/comma-separated-values,text/plain", ".csv")),
              tags$hr(),
              checkboxInput("header", "Header", TRUE),
              radioButtons("sep", "Separator", choices = c(Comma = ",", Semicolon = ";", Tab = "\t"), selected = ","),
              radioButtons("quote", "Quote", choices = c(None = "", "Double Quote" = '"', "Single Quote" = "'"), selected = '"')
      )
    )
  )
)

