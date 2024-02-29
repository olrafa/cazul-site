import React from "react";

import { MangroveFeature } from "../constants/types";

type MapSidebarProps = {
  feature?: MangroveFeature;
};

export default function MapSidebar({ feature }: MapSidebarProps) {
  if (!feature) {
    return <></>;
  }

  const { nome, uf, classe, bioma } = feature;

  return (
    <div>
      <p>{nome}</p>
      <p>{uf}</p>
      <p>{bioma}</p>
      <p>{classe}</p>
    </div>
  );
}
