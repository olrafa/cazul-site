import { View } from "ol";
import { GeoJSON, MVT } from "ol/format";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorTileLayer from "ol/layer/VectorTile";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import VectorTileSource from "ol/source/VectorTile.js";
import XYZ from "ol/source/XYZ";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

import { TILE_ATTRIBUTION, TILE_URL } from "../constants";

export const mangroveOriginalStyle = new Style({
  fill: new Fill({
    color: "rgba(0, 255, 128, 0.6)",
  }),
  stroke: new Stroke({
    color: "#00CC00",
    width: 1,
  }),
});

export const mangroveHighlightStyle = new Style({
  fill: new Fill({
    color: "rgba(0, 153, 76, 0.8)",
  }),
  stroke: new Stroke({
    color: "#00CC00",
    width: 1,
  }),
});

const populationStyle = new Style({
  fill: new Fill({ color: "rgba(158, 105, 183, 0.4)" }),
  stroke: new Stroke({ color: "#8F5EA6", width: 1 }),
});

export const populationHighlightStyle = new Style({
  fill: new Fill({
    color: "rgba(161, 57, 209, 0.8)",
  }),
  stroke: new Stroke({
    color: "#8F5EA6",
    width: 1,
  }),
});

const mangroveTileSource = new VectorTileSource({
  url: "http://localhost:3002/tiles/mangrove/{z}/{x}/{y}.png",
  format: new MVT({
    idProperty: "id",
  }),
});

export const mangroveTileLayer = new VectorTileLayer({
  source: mangroveTileSource,
  style: mangroveOriginalStyle,
});

export const populationSource = new VectorSource({
  url: "http://localhost:3002/layers/population",
  format: new GeoJSON(),
});

export const populationLayer = new VectorLayer({
  source: populationSource,
  style: populationStyle,
  minZoom: 6,
});

export const baseLayer = new TileLayer({
  source: new XYZ({
    url: TILE_URL,
    attributions: TILE_ATTRIBUTION,
    attributionsCollapsible: false,
  }),
});

export const mainView = new View({
  center: fromLonLat([-38.5, -13.5]),
  zoom: 6.5,
  maxZoom: 18,
});
