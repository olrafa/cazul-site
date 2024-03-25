import React from "react";

import { MunicipalityPopData } from "../constants/types";

type MapSidebarProps = {
  municipality?: MunicipalityPopData;
};

export default function MapSidebar({ municipality }: MapSidebarProps) {
  if (!municipality) {
    return <></>;
  }

  const {
    total,
    municipio,
    uf,
    dom_urbano,
    dom_rural,
    sex_mulher,
    sex_homem,
    cor_amarela,
    cor_branca,
    cor_indigena,
    cor_parda,
    cor_preta,
    idade_avg,
    ativ_extrativistas,
    ativ_pecuaristas,
  } = municipality;

  return (
    <div>
      <p>{municipio}</p>
      <p>{uf}</p>
      <p>{total}</p>
      <p>{dom_urbano}</p>
      <p>{dom_rural}</p>
      <p>{sex_mulher}</p>
      <p>{sex_homem}</p>
      <p>{cor_amarela}</p>
      <p>{cor_branca}</p>
      <p>{cor_indigena}</p>
      <p>{cor_parda}</p>
      <p>{cor_preta}</p>
      <p>{idade_avg}</p>
      <p>{ativ_extrativistas}</p>
      <p>{ativ_pecuaristas}</p>
    </div>
  );
}
