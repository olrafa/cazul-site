"use client";

import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map";

import { MangroveFeature } from "../constants/types";
import {
  baseLayer,
  mainView,
  mangroveHighlightStyle,
  mangroveTileLayer,
  mangroveTileSource,
} from "../util/mapUtil";

import "ol/ol.css";
import VectorTileLayer from "ol/layer/VectorTile";
import { FeatureLike } from "ol/Feature";
import { MapBrowserEvent } from "ol";

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
      layers: [baseLayer, mangroveTileLayer],
      view: mainView,
    });

    const selectionLayer = new VectorTileLayer({
      map: map,
      renderMode: "vector",
      source: mangroveTileSource,
      style: (feature) => {
        const id = feature.getId();
        if (id && id in selection) {
          return mangroveHighlightStyle;
        }
      },
    });

    map.updateSize();

    let selection: { [key: number]: FeatureLike } = {};

    map.on(["click", "pointermove"], (event) => {
      if (!(event instanceof MapBrowserEvent)) {
        return;
      }

      const isClick = event.type === "click";

      if (isClick || !isAreaSelected) {
        mangroveTileLayer.getFeatures(event.pixel).then((features) => {
          selection = {};
          const feature = features[0];
          isClick && setIsAreaSelected(!!feature);

          const fid = feature?.getId() as number;
          if (fid) {
            selection[fid] = feature;
          }

          selectionLayer.changed();

          if (!feature) {
            updateSideBar(undefined);
            return;
          }

          const properties = feature.getProperties();
          // eslint-disable-next-line unused-imports/no-unused-vars
          const { layers, ...sidebarFeature } = properties;
          updateSideBar(sidebarFeature as MangroveFeature);
        });
      }
    });

    return () => map.dispose();
  }, [updateSideBar, isAreaSelected]);

  return <div ref={mapRef} className="flex-1"></div>;
};

export default MapComponent;
