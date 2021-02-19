# Copyright 2021 Victor Dibia

# [START gae_python38_app]
# [START gae_python3_app]
from flask import Flask, request, render_template, jsonify
from modules.predict import get_predictions

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.

static_folder_root = "build"
app = Flask(__name__, static_url_path='',
            static_folder=static_folder_root, template_folder=static_folder_root)


@app.route('/')
def hello():
    """Return application landing page."""
    # return 'Hello World!'
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    """Return prediction response."""
    if request.method == 'POST':
        data = request.get_json()
    return jsonify(get_predictions(data))


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python3_app]
# [END gae_python38_app]
