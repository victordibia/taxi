import googleapiclient.discovery
from google.api_core.client_options import ClientOptions
import json
from datetime import datetime

with open('modules/zoneDict.json') as f:
    zoneDict = json.load(f)


def predict_json(project, region, model, instances, version=None):
    """Send json data to a deployed model for prediction.

    Args:
        project (str): project where the Cloud ML Engine Model is deployed.
        region (str): regional endpoint to use; set to None for ml.googleapis.com
        model (str): model name.
        instances ([Mapping[str: Any]]): Keys should be the names of Tensors
            your deployed model expects as inputs. Values should be datatypes
            convertible to Tensors, or (potentially nested) lists of datatypes
            convertible to tensors.
        version: str, version of the model to target.
    Returns:
        Mapping[str: any]: dictionary of prediction results defined by the
            model.
    """
    # Create the ML Engine service object.
    # To authenticate set the environment variable
    # GOOGLE_APPLICATION_CREDENTIALS=<path_to_service_account_file>
    prefix = "{}-ml".format(region) if region else "ml"
    api_endpoint = "https://{}.googleapis.com".format(prefix)
    client_options = ClientOptions(api_endpoint=api_endpoint)
    service = googleapiclient.discovery.build(
        'ml', 'v1', client_options=client_options)
    name = 'projects/{}/models/{}'.format(project, model)

    if version is not None:
        name += '/versions/{}'.format(version)

    response = service.projects().predict(
        name=name,
        body={'instances': instances}
    ).execute()

    if 'error' in response:
        raise RuntimeError(response['error'])

    return response['predictions']


def get_predictions(data):
    project = "ml-experiments-219215"
    region = "us-central1"
    model = "taximodel"

    date = datetime.strptime(data["date"], '%Y-%m-%d %H:%M:%S')
    source = zoneDict[data["source"]]
    destination = zoneDict[data["destination"]]
    isweekday = 0.0 if date.weekday() < 5 else 1.0

    instances = [[1.0,  (date.month), 17,  (date.hour),
                  isweekday, 0,  (date.weekday()), source, destination]]
    # print(date.hour, date.weekday(), date.month)
    version = "taxi_mlp"
    predictions = predict_json(
        project, region, model, instances, version=version)
    return predictions
