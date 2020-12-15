# Taxi Fare Prediction (on Google Cloud Platform)
This repo is meant to demonstrate examples on how production ML pipelines can be orchestrated using platforms like Google Compute Platform.

## Architecture and Components

- Data [New York Taxi Cab](https://www1.nyc.gov/site/tlc/about/tlc-trip-record-data.page)
- Pipeline Orchestration (Composer)
  - Composer Block -> Data Ingest  (load csv files), write to GCS
  - DataProc (Data Cleaning) -> ingest csv from GCS, clean and write result to GCS 
  - Cloud AI Platform (Model Training) -> Train a model (decision tree, feed forward DNN) to predict fares or time given properties of a trip (start and end location, time of day, etc). Write trained model to GCS
  - Cloud AI Platform (Model Serving) -> load trained model from GCS, serve over end point 
  - App Engine (Front End App) -> serve front end app to consume API end point. 
- Timeline: Two months .. Expected completion - end of Feb 2021
- ML Technologies (decision tree, feed forward DNN)
