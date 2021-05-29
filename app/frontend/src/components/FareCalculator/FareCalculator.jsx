import React, { useEffect, useState } from "react";
import "./curate.css";

import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { MapView } from "@deck.gl/core";
import uniqBy from "lodash/uniqBy";
import LocationSelector from "./LocationSelector/LocationSelector";
import { GaPageView } from "../helperfunctions/HelperFunctions";
import Footer from "./Footer";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const nyZones = require("../../data/nyzones.geo.json");

const colorOpacity = 200;
const colorList = [
  [239, 68, 68, colorOpacity],
  [245, 158, 11, colorOpacity],
  [16, 185, 129, colorOpacity],
  [59, 130, 246, colorOpacity],
  [139, 92, 246, colorOpacity],
  [236, 72, 153, colorOpacity],
];

let isHovering = false;

// Change cursor to pointer on hover over a GeoJson Layer Tile
function getDeckCursor({ isDragging }) {
  return isDragging ? "grabbing" : isHovering ? "pointer" : "grab";
}

function arrayToRGB(arr) {
  return (
    "rgba(" + arr[0] + "," + arr[1] + "," + arr[2] + "," + arr[3] / 255 + ")"
  );
}

const FareCalculator = () => {
  const [selectedSourceZone, setSelectedSourceZone] = useState(73);
  const [selectedDestinationZone, setSelectedDestinationZone] = useState(42);

  let zoneData = [];
  const zones = nyZones.features.map((x, i) => {
    let hold = x;
    hold.properties["selected"] = false;
    hold.properties["index"] = i;
    if (i === selectedSourceZone) {
      hold.properties["selected"] = true;
      hold.properties["selectedas"] = "source";
    }
    if (i === selectedDestinationZone) {
      hold.properties["selected"] = true;
      hold.properties["selectedas"] = "destination";
    }

    zoneData.push(hold);
    return x.properties.zone;
  });
  const boroughs = uniqBy(nyZones.features.map((x) => x.properties.borough));

  const boroughColorMap = {};
  const selectedColor = [255, 255, 100, 230];
  boroughs.forEach((x, i) => {
    boroughColorMap[x] = colorList[i];
  });

  const selections = {
    config: {
      getter: {
        source: selectedSourceZone,
        destination: selectedDestinationZone,
      },
      setter: {
        source: setSelectedSourceZone,
        destination: setSelectedDestinationZone,
      },
    },
    boroughs: boroughs,
    zones: zones,
    boroughColorMap: boroughColorMap,
  };

  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: -73.935242,
    latitude: 40.73061,
    zoom: 10.0,
    pitch: 0,
    bearing: 0,
  };

  // console.log(zoneData, nyZones.features);

  function processZoneHover(e) {
    isHovering = Boolean(e);
    const properties = e.object?.properties;
    const id = properties?.LocationID;
    if (id && properties?.borough) {
      const tooltipitem = document.getElementById("tooltipitem");
      tooltipitem.style.top = e.y - 10 + "px";
      tooltipitem.style.left = e.x + 15 + "px";

      tooltipitem.classList.remove("hidden");
      document.getElementById("tooltipborough").textContent =
        properties?.borough;
      document.getElementById("tooltipzone").textContent = properties?.zone;
      document.getElementById("tooltipbar").style.background = arrayToRGB(
        boroughColorMap[properties?.borough]
      );
    }
  }

  function deckHover(e) {
    if (e.layer?.id === "nyzones") {
      processZoneHover(e);
    } else {
      isHovering = false;
      document.getElementById("tooltipitem").classList.add("hidden");
    }
  }

  function deckClick(e) {
    // console.log(e);
    if (e.layer?.id === "nyzones") {
      setSelectedDestinationZone(e.object.properties.index);
    }
  }

  // function zoneClick(e) {
  //   // console.log(e.object.properties);
  //   setSelectedDestinationZone(e.object.properties.index);
  // }

  // console.log(zones.length, nyZones.features.length);

  useEffect(() => {
    document.title = `Taxi Advisor | Fare Prediction `;
    GaPageView();
  }, []);

  return (
    <div className="">
      <div className="  ">
        <DeckGL
          getCursor={getDeckCursor}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          onHover={deckHover}
          onClick={deckClick}
          controller={{ doubleClickZoom: false }}
        >
          <MapView id="map" width="100%" controller={true}>
            <StaticMap
              // style="dark-v10"
              mapStyle="mapbox://styles/mapbox/dark-v10"
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            />
          </MapView>

          <GeoJsonLayer
            id="nyzones"
            data={zoneData}
            pickable={true}
            opacity={0.8}
            // stroked={true}
            filled={true}
            // extruded={true}
            // lineWidthScale={2}
            lineWidthMinPixels={1}
            getFillColor={(d) => {
              if (d.properties.selected) {
                return selectedColor;
              }
              return boroughColorMap[d.properties.borough];
            }}
            getLineColor={[243, 244, 246, 180]}
            getRadius={100}
            getLineWidth={1}
            // onClick={zoneClick}
          />
        </DeckGL>
      </div>

      <div
        id="tooltipitem"
        className="hidden pointer-events-none absolute -left-10 p-3 shadow rounded-sm bg-white"
      >
        {" "}
        <div id="tooltipbar" className={"h-1 mb-1 bg-green-500"}></div>
        <div>
          {" "}
          <span className="font-semibold"> Zone : </span>{" "}
          <span id="tooltipzone"> Queens Village </span>
        </div>
        <div>
          {" "}
          <span className="font-semibold"> Borough : </span>{" "}
          <span id="tooltipborough"> Queens </span>
        </div>
      </div>

      <div className="absolute ml-2 ">
        <LocationSelector selections={selections} />
      </div>
      <Footer />
    </div>
  );
};

export default FareCalculator;
