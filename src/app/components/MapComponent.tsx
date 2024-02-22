"use client";

import React, { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import "ol/ol.css";

import { TILE_ATTRIBUTION, TILE_URL } from "../constants";

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: TILE_URL,
            attributions: TILE_ATTRIBUTION,
            attributionsCollapsible: false,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-58.882778, -15.793889]),
        zoom: 4.5,
      }),
    });

    map.updateSize();

    return () => map.dispose();
  }, []);

  return <div ref={mapRef} className="flex-1"></div>;
};

export default MapComponent;
