import React from "react";
import "./curate.css";

import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { MapView, FirstPersonView } from "@deck.gl/core";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const FareCalculator = () => {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };
  // Data to be used by the LineLayer
  const data = [
    {
      sourcePosition: [-122.41669, 37.7853],
      targetPosition: [-122.41669, 37.781],
    },
  ];
  return (
    <div className="border h-full">
      <div className="border">FareCalculator</div>
      <DeckGL
        className="border"
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <MapView id="map" width="100%" controller={true}>
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </MapView>

        {/* <LineLayer id="line-layer" data={data} /> */}
      </DeckGL>
    </div>
  );
};

export default FareCalculator;
