// import React, { useState } from "react";
import { Select } from "antd";
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
      <div className="mt-2   inline-block rounded-sm   bg-white p-3  bg-opacity-90">
        <div className="mb-2 text-sm font-semibold"> Specify Trip Details</div>
        <div className="mb-2"> </div>

        <div className="mt-2">
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
      </div>
    )
  );
};

export default LocationSelector;
