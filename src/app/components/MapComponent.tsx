"use client";

import React, { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { fromLonLat } from "ol/proj";
import XYZ from "ol/source/XYZ";
import { GeoJSON } from "ol/format";
import "ol/ol.css";

import { TILE_ATTRIBUTION, TILE_URL } from "../constants";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

type MapComponentProps = {
  updateSideBar: (name: string) => void;
};

const MapComponent = ({ updateSideBar }: MapComponentProps) => {
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
        new VectorLayer({
          source: new VectorSource({
            url: "http://localhost:3002/layers/mangue",
            format: new GeoJSON(),
          }),
          style: {
            "fill-color": "#35DD35",
          },
          minZoom: 8,
        }),
      ],
      view: new View({
        center: fromLonLat([-38.5, -13.5]),
        zoom: 6.5,
        maxZoom: 18,
      }),
    });

    map.updateSize();

    map.on("pointermove", (event) => {
      const features = map.getFeaturesAtPixel(event.pixel);
      const [feature] = features;
      if (!feature) {
        updateSideBar("");
        return;
      }

      const properties = feature.getProperties();
      updateSideBar(properties.nome);
    });

    return () => map.dispose();
  }, [updateSideBar]);

  return <div ref={mapRef} className="flex-1"></div>;
};

export default MapComponent;
