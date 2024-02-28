"use client";

import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

import { MangroveFeature } from "../constants/types";
import {
  baseLayer,
  mainView,
  mangroveHighlightStyle,
  mangroveLayer,
  mangroveOriginalStyle,
} from "../util/mapUtil";

import "ol/ol.css";

type MapComponentProps = {
  updateSideBar: (feature: MangroveFeature | undefined) => void;
};

const MapComponent = ({ updateSideBar }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, mangroveLayer],
      view: mainView,
    });

    map.updateSize();

    map.on("pointermove", (event) => {
      const features = map.getFeaturesAtPixel(event.pixel);
      const [feature] = features;

      // clear styles
      const mangroveSource = mangroveLayer.getSource();
      mangroveSource &&
        mangroveSource.forEachFeature((feat) => {
          feat.setStyle(mangroveOriginalStyle);
        });

      if (!feature) {
        updateSideBar(undefined);
        return;
      }

      const mapFeature = feature as Feature<Geometry>;
      mapFeature.setStyle(mangroveHighlightStyle);

      const properties = feature.getProperties();

      // eslint-disable-next-line unused-imports/no-unused-vars
      const { geometry, ...sidebarFeature } = properties;
      updateSideBar(sidebarFeature as MangroveFeature);
    });

    return () => map.dispose();
  }, [updateSideBar]);

  return <div ref={mapRef} className="flex-1"></div>;
};

export default MapComponent;
