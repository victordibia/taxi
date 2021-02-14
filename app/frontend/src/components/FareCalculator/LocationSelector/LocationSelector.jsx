import moment from "moment";
import { Select, DatePicker } from "antd";
// import { loadJSONData } from "../../helperfunctions/HelperFunctions";
const { Option } = Select;

const LocationSelector = (props) => {
  const zones = props.zones || [];
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
  return (
    zones.length > 0 && (
      <div className="mt-2 shadow  inline-block rounded   bg-gray-50   bg-opacity-100">
        <div
          id="header"
          className="mb-2 bg-gray-300 rounded rounded-b-none text-sm font-semibold  py-3 px-4"
        >
          {" "}
          Specify Trip Details
        </div>

        <div id="body" className="mb-2 p-4 pt-2">
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
              style={{ width: zoneDropdownWidth }}
              showTime={{ format: "HH:mm" }}
              defaultValue={moment()}
              // onChange={onChange}
              // onOk={onOk}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default LocationSelector;
