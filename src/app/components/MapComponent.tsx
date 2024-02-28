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
import { Feature } from "ol";
import { Geometry } from "ol/geom";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import {
  baseLayer,
  mainView,
  mangueHighlightStyle,
  mangueLayer,
  mangueOriginalStyle,
} from "../util/mapUtil";
import { MangueFeature } from "../constants/types";

type MapComponentProps = {
  updateSideBar: (feature: MangueFeature | undefined) => void;
};

const MapComponent = ({ updateSideBar }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, mangueLayer],
      view: mainView,
    });

    map.updateSize();

    map.on("pointermove", (event) => {
      const features = map.getFeaturesAtPixel(event.pixel);
      const [feature] = features;

      // clear styles
      const mangueSource = mangueLayer.getSource();
      mangueSource &&
        mangueSource.forEachFeature((feat) => {
          feat.setStyle(mangueOriginalStyle);
        });

      if (!feature) {
        updateSideBar(undefined);
        return;
      }

      const mapFeature = feature as Feature<Geometry>;
      mapFeature.setStyle(mangueHighlightStyle);

      const properties = feature.getProperties();
      console.log(properties);
      // const sidebarFeature = properties

      const { geometry, ...sidebarFeature } = properties;
      updateSideBar(sidebarFeature as MangueFeature);
    });

    return () => map.dispose();
  }, [updateSideBar]);

  return <div ref={mapRef} className="flex-1"></div>;
};

export default MapComponent;
