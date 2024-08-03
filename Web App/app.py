from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import os
from dash import Dash, html, dcc
import dash_bootstrap_components as dbc
import plotly.express as px

app = Flask(__name__)
dash_app = Dash(__name__, server=app, url_base_pathname='/dashboard/', external_stylesheets=[dbc.themes.BOOTSTRAP])

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'csv', 'xlsx'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return '''
    <!doctype html>
    <title>Upload a File</title>
    <h1>Upload a File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        return redirect(url_for('show_dashboard', filename=filename))
    return redirect(request.url)

@app.route('/dashboard/<filename>')
def show_dashboard(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if filename.endswith('.csv'):
        df = pd.read_csv(file_path)
    elif filename.endswith('.xlsx'):
        df = pd.read_excel(file_path)
    else:
        return "Unsupported file format"
    
    fig = px.line(df, x=df.columns[0], y=df.columns[1:])
    
    dash_app.layout = html.Div([
        dbc.Container([
            dbc.Row([
                dbc.Col(html.H1("Dashboard", className="text-center text-primary mb-4"), className="mt-4")
            ]),
            dbc.Row([
                dbc.Col(dcc.Graph(figure=fig))
            ])
        ])
    ])
    
    return redirect('/dashboard/')

# Set an initial layout for the Dash app
dash_app.layout = html.Div([
    html.H1("No data uploaded yet.")
])

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)