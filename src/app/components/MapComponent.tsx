"use client";

import { MapBrowserEvent } from "ol";
import BaseEvent from "ol/events/Event";
import { FeatureLike } from "ol/Feature";
import VectorTileLayer from "ol/layer/VectorTile";
import Map from "ol/Map";
import React, { useEffect, useRef } from "react";

import { MangroveFeature } from "../constants/types";
import {
  baseLayer,
  mainView,
  mangroveHighlightStyle,
  mangroveTileLayer,
  mangroveTileSource,
} from "../util/mapUtil";

import "ol/ol.css";

type MapComponentProps = {
  updateSideBar: (feature: MangroveFeature | undefined) => void;
};

const MapComponent = ({ updateSideBar }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isAreaSelectedRef = useRef<boolean>(false);

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

    const handleEvent = (event: BaseEvent | Event) => {
      if (!(event instanceof MapBrowserEvent)) {
        return;
      }
      const isClick = event.type === "click";

      if (isClick || !isAreaSelectedRef.current) {
        mangroveTileLayer.getFeatures(event.pixel).then((features) => {
          selection = {};

          const feature = features[0];

          if (!feature) {
            updateSideBar(undefined);
            isAreaSelectedRef.current = false;
            selectionLayer.changed();
            return;
          }

          const fid = feature.getId() as number;
          if (fid) {
            selection[fid] = feature;
            selectionLayer.changed();
            if (isClick) {
              isAreaSelectedRef.current = true;
            }
          }

          const properties = feature.getProperties();
          // eslint-disable-next-line unused-imports/no-unused-vars
          const { layers, ...sidebarFeature } = properties;
          updateSideBar(sidebarFeature as MangroveFeature);
        });
      }
    };

    map.on(["click", "pointermove"], handleEvent);

    return () => {
      map.un(["click", "pointermove"], handleEvent);
      map.dispose();
    };
  }, [updateSideBar]);

  return <div ref={mapRef} className="flex-1"></div>;
};

export default MapComponent;
