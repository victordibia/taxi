import moment from "moment";
import { Select, DatePicker, Button } from "antd";
// import { loadJSONData } from "../../helperfunctions/HelperFunctions";
const { Option } = Select;

const LocationSelector = (props) => {
  const zones = props.selections.zones || [];
  const boroughs = props.selections.boroughs || [];
  const colorMap = props.selections.boroughColorMap || {};
  const zoneDropdownWidth = 250;

  const config = props.selections.config;
  const selectedSourceZone = config.getter.source;
  const selectedDestinationZone = config.getter.destination;

  const zonesList = zones.map((data, i) => {
    return (
      <Option value={data} key={"locrow" + i} index={i}>
        {" "}
        {data}{" "}
      </Option>
    );
  });

  console.log(moment().format("YY-MM-DD HH:mm"));

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

  function predictButtonClick(e) {
    console.log(document.getElementById("tripdate").value);
  }

  return (
    zones.length > 0 && (
      <div className="mt-2 shadow rounded   bg-gray-50   bg-opacity-100">
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
            >
              {" "}
              Predict Fare{" "}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default LocationSelector;
