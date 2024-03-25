import { GeoJSON } from "ol/format";

export type MangroveFeature = {
  nome: string;
  uf: string;
  classe: string;
  bioma: string;
};

export type MunicipalityPopData = {
  ativ_extrativistas: number;
  ativ_pecuaristas: number;
  cor_amarela: number;
  cor_branca: number;
  cor_indigena: number;
  cor_parda: number;
  cor_preta: number;
  dom_rural: number;
  dom_urbano: number;
  idade_avg: number;
  municipio: string;
  geocodm: string;
  sex_homem: number;
  sex_mulher: number;
  total: number;
  uf: string;
};

export type MunicipalityPopDataResponse = MunicipalityPopData & {
  geometry: GeoJSON;
};
