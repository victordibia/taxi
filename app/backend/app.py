
import argparse
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
import logging
import os
import numpy as np
import pandas as pd
import time
import json


logging.basicConfig(level=logging.INFO)

# Point Flask to the front end directory
root_file_path = os.getcwd() + "/app"
print(root_file_path, os.getcwd())
static_folder_root = os.path.join(root_file_path, "frontend/build")
print(static_folder_root)

app = Flask(__name__, static_url_path='',
            static_folder=static_folder_root, template_folder=static_folder_root)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def hello():
    return render_template('index.html')


@app.route('/locations')
def get_locations():
    return jsonify("locations")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Application parameters')
    parser.add_argument('-p', '--port', dest='port', type=int,
                        help='port to run model', default=os.environ.get("CDSW_READONLY_PORT"))

    args, unknown = parser.parse_known_args()
    port = args.port
    app.run(port=port)
