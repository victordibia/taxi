import moment from "moment";
import { Select, DatePicker, Button, Alert } from "antd";
import { postJSONData } from "../../helperfunctions/HelperFunctions";
import { useState } from "react";
const { Option } = Select;

const LocationSelector = (props) => {
  const predictionUrl =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:8080/predict"
      : "/predict";

  // State Variables
  const [fetchingPredictions, setIsFetchingPredictions] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({ status: true, message: "" });

  const zones = props.selections.zones || [];
  const boroughs = props.selections.boroughs || [];
  const colorMap = props.selections.boroughColorMap || {};
  const zoneDropdownWidth = 250;

  const config = props.selections.config;
  const selectedSourceZone = config.getter.source;
  const selectedDestinationZone = config.getter.destination;

  // console.log(selectedDestinationZone);
  const zonesList = zones.map((data, i) => {
    return (
      <Option value={data} key={"locrow" + i} index={i}>
        {" "}
        {data}{" "}
      </Option>
    );
  });

  const borougLegendList = boroughs.map((data, i) => {
    const c = colorMap[data];
    const color = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";

    return (
      <span key={"borough" + i} className="text-sm mr-2 inline-block ">
        {" "}
        <span
          style={{
            backgroundColor: color,
          }}
          className={"w-3 inline-block h-3 mr-1 rounded bg-gray-500 "}
        ></span>
        <span>{data}</span>
      </span>
    );
  });

  function fetchPredictions(data) {
    const predictions = postJSONData(predictionUrl, data);

    setIsFetchingPredictions(true);
    predictions
      .then((data) => {
        if (data) {
          // console.log(data);
          setIsFetchingPredictions(false);
          setFetchStatus({
            status: true,
            message: "Successfully fetched predictions.",
          });
          setPredictions(data);
        }
      })
      .catch(function (err) {
        console.log("Failed to fetch predictions", err);
        setIsFetchingPredictions(false);
        setFetchStatus({
          status: false,
          message: "Failed to reach predictions server. Try again later.",
        });
      });
  }

  function predictButtonClick(e) {
    const tripDate = document.getElementById("tripdate").value;
    const sourceZone = zones[selectedSourceZone];
    const destinationZone = zones[selectedDestinationZone];
    // console.log(tripDate, sourceZone, destinationZone);

    const postData = {
      date: tripDate,
      source: sourceZone,
      destination: destinationZone,
    };
    fetchPredictions(postData);
  }

  <div className="w-full rounded-tl p-2 px-4 absolute bottom-0 right-0 bg-gray-300">
    <div className="    border-l-0 border-r-0 border-t-0 border-dashed   border-gray-600">
      Google has generously supported this work by providing Google Cloud
      credits.
    </div>
  </div>;

  return (
    zones.length > 0 && (
      <div className="mt-2 shadow   bg-opacity-100">
        <div className="mb-3 p-3 rounded   bg-gray-50   ">
          <div className="font-semibold pb-1">Welcome!</div>
          <div className="w-64 text-sm">
            This page demonstrates how a machine learning model can be used to
            predict trip time and fare taxi rides in New York.
          </div>
        </div>

        <div className="rounded   bg-gray-50   ">
          <div
            id="header"
            className="mb-2 bg-gray-300 rounded rounded-b-none text-sm font-semibold  py-3 px-4"
          >
            {" "}
            Specify Trip Details
          </div>

          <div className="m-4 p-2 pl-3 pb-0 bg-gray-200 rounded">
            {" "}
            <div className="pb-2  w-56 ">{borougLegendList}</div>{" "}
          </div>
          <div id="body" className="mb-2 p-4 pt-0">
            <div className="">
              <div className="text-xs mb-1 text-gray-500">
                {" "}
                From: {zones[selectedSourceZone]}{" "}
              </div>
              <Select
                id="sourcezone"
                defaultValue={zones[selectedSourceZone]}
                showSearch
                style={{ width: zoneDropdownWidth }}
                placeholder="Select a Zone"
                optionFilterProp="children"
                onChange={(value, row) => {
                  config.setter.source(row.index);
                }}
              >
                {zonesList}
              </Select>
            </div>

            <div className="mt-3 mb-2">
              <div className="text-xs mb-1 text-gray-500">
                {" "}
                To: {zones[selectedDestinationZone]}{" "}
              </div>
              <Select
                id="destinationzone"
                defaultValue={zones[selectedDestinationZone]}
                showSearch
                value={zones[selectedDestinationZone]}
                style={{ width: zoneDropdownWidth }}
                placeholder="Select a Zone"
                optionFilterProp="children"
                onChange={(value, row) => {
                  config.setter.destination(row.index);
                }}
              >
                {zonesList}
              </Select>
            </div>

            <div className="mt-3 ">
              <div className="text-xs mb-1 text-gray-500"> Trip Time</div>
              <DatePicker
                id="tripdate"
                style={{ width: zoneDropdownWidth }}
                showTime={{ format: "HH:mm" }}
                defaultValue={moment()}
                // onChange={onChange}
                // onOk={onOk}
              />
            </div>

            <div className="mt-3">
              <Button
                style={{ zoneDropdownWidth }}
                onClick={predictButtonClick}
                type="primary"
                block
                loading={fetchingPredictions}
              >
                {" "}
                Predict Fare{" "}
              </Button>
            </div>

            {/* <div className="mt-3">
            Failed ...
            <Alert
              message="Error Text"
              description="Error Description Error Description Error Description Error Description Error Description Error Description"
              type="error"
              closable
              // onClose={onClose}
            />
          </div> */}

            {predictions && (
              <div
                className={
                  "mt-3 text-white   grid grid-cols-2 gap-2 " +
                  (fetchingPredictions
                    ? " opacity-50 pointer-events-none "
                    : "")
                }
              >
                <div className="text-center p-1 bg-green-500 rounded">
                  <span className="text-xl font-semibold">
                    {" "}
                    {predictions[0][0].toFixed(1)}{" "}
                  </span>{" "}
                  mins
                </div>
                <div className="text-center p-1 bg-green-500 rounded">
                  <span className="text-xl font-semibold">
                    {" "}
                    {predictions[0][1].toFixed(2)}
                  </span>{" "}
                  $
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default LocationSelector;
