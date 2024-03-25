"use client";

import { MapBrowserEvent } from "ol";
import BaseEvent from "ol/events/Event";
import { FeatureLike } from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import Map from "ol/Map";
import React, { useEffect, useRef } from "react";

import { MunicipalityPopData } from "../constants/types";
import {
  baseLayer,
  mainView,
  mangroveTileLayer,
  populationHighlightStyle,
  populationLayer,
  populationSource,
} from "../util/mapUtil";

import "ol/ol.css";

type MapComponentProps = {
  updateSideBar: (municipality: MunicipalityPopData | undefined) => void;
};

const MapComponent = ({ updateSideBar }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const isAreaSelectedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, populationLayer, mangroveTileLayer],
      view: mainView,
    });

    const selectionLayer = new VectorLayer({
      map: map,
      source: populationSource,
      style: (feature) => {
        const { geocodm } = feature.getProperties();
        if (geocodm && geocodm in selection) {
          return populationHighlightStyle;
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
        populationLayer.getFeatures(event.pixel).then((features) => {
          selection = {};

          const feature = features[0];

          if (!feature) {
            updateSideBar(undefined);
            isAreaSelectedRef.current = false;
            selectionLayer.changed();
            return;
          }

          const properties = feature.getProperties();

          const { geocodm } = properties;

          if (geocodm) {
            selection[geocodm] = feature;
            selectionLayer.changed();
            if (isClick) {
              isAreaSelectedRef.current = true;
            }
          }
          // eslint-disable-next-line unused-imports/no-unused-vars
          const { geometry, ...sidebarFeature } = properties;
          updateSideBar(sidebarFeature as MunicipalityPopData);
        });
      }
    };

    map.on(["click", "pointermove"], handleEvent);

    return () => {
      map.un(["click", "pointermove"], handleEvent);
      map.dispose();
    };
  }, [updateSideBar]);

  return <div ref={mapRef} className="flex-1 bg-cazul-blue"></div>;
};

export default MapComponent;
