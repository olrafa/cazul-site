"use client";

import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import { Feature } from "ol";
import { Geometry } from "ol/geom";

import { MangroveFeature } from "../constants/types";
import {
  baseLayer,
  clearMangroveLayerStyle,
  getFeaturedFeature,
  mainView,
  mangroveLayer,
} from "../util/mapUtil";

import "ol/ol.css";

type MapComponentProps = {
  updateSideBar: (feature: MangroveFeature | undefined) => void;
};

const MapComponent = ({ updateSideBar }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const [isAreaSelected, setIsAreaSelected] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, mangroveLayer],
      view: mainView,
    });

    map.updateSize();

    map.on("pointermove", (event) => {
      if (!isAreaSelected) {
        const features = map.getFeaturesAtPixel(event.pixel);
        const [feature] = features;
        clearMangroveLayerStyle();

        if (!feature) {
          updateSideBar(undefined);
          return;
        }

        const sidebarFeature = getFeaturedFeature(feature as Feature<Geometry>);
        updateSideBar(sidebarFeature);
      }
    });

    map.on("click", (event) => {
      const features = map.getFeaturesAtPixel(event.pixel);
      const [feature] = features;
      clearMangroveLayerStyle();

      if (!feature) {
        setIsAreaSelected(false);
        updateSideBar(undefined);
        return;
      }

      setIsAreaSelected(true);
      const sidebarFeature = getFeaturedFeature(feature as Feature<Geometry>);
      updateSideBar(sidebarFeature);
    });

    return () => map.dispose();
  }, [updateSideBar, isAreaSelected]);

  return <div ref={mapRef} className="flex-1"></div>;
};

export default MapComponent;
