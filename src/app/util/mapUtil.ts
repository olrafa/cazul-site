import { GeoJSON } from "ol/format";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { TILE_ATTRIBUTION, TILE_URL } from "../constants";
import { Feature, View } from "ol";
import { fromLonLat } from "ol/proj";
import { Geometry } from "ol/geom";
import { MangroveFeature } from "../constants/types";

export const mangroveOriginalStyle = new Style({
  fill: new Fill({
    color: "rgba(0, 255, 128, 0.6)",
  }),
  stroke: new Stroke({
    color: "#00CC00",
    width: 1,
  }),
});

const mangroveHighlightStyle = new Style({
  fill: new Fill({
    color: "rgba(0, 153, 76, 0.8)",
  }),
  stroke: new Stroke({
    color: "#00CC00",
    width: 1,
  }),
});

export const mangroveLayer = new VectorLayer({
  source: new VectorSource({
    url: "http://localhost:3002/layers/mangrove",
    format: new GeoJSON(),
  }),
  style: mangroveOriginalStyle,
  minZoom: 8,
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

export const clearMangroveLayerStyle = () => {
  const mangroveSource = mangroveLayer.getSource();
  mangroveSource &&
    mangroveSource.forEachFeature((feat) => {
      feat.setStyle(mangroveOriginalStyle);
    });
};

export const getFeaturedFeature = (
  mapFeature: Feature<Geometry>,
): MangroveFeature => {
  mapFeature.setStyle(mangroveHighlightStyle);

  const properties = mapFeature.getProperties();

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { geometry, ...sidebarFeature } = properties;
  return sidebarFeature as MangroveFeature;
};
