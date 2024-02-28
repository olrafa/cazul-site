import React from "react";
import { MangueFeature } from "../constants/types";

type MapSidebarProps = {
  feature?: MangueFeature;
};

export default function MapSidebar({ feature }: MapSidebarProps) {
  if (!feature) {
    return <div className="w-1/6"></div>;
  }

  const { nome, uf, classe, bioma } = feature;

  return (
    <div className="w-1/6">
      <p>{nome}</p>
      <p>{uf}</p>
      <p>{bioma}</p>
      <p>{classe}</p>
    </div>
  );
}
