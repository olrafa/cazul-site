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
      <p>
        <span>População total: </span>
        {total}
      </p>
      <p>
        <span>Em domicílio urbano: </span> {dom_urbano}
      </p>
      <p>
        <span>Em domicílio rural: </span> {dom_rural}
      </p>
      <p>
        <span>Mulheres: </span>
        {sex_mulher}
      </p>
      <p>
        <span>Homens: </span>
        {sex_homem}
      </p>
      <p>
        <span>Amarela: </span>
        {cor_amarela}
      </p>
      <p>
        <span>Branca: </span>
        {cor_branca}
      </p>
      <p>
        <span>Indígena: </span>
        {cor_indigena}
      </p>
      <p>
        <span>Parda: </span>
        {cor_parda}
      </p>
      <p>
        <span>Preta: </span>
        {cor_preta}
      </p>
      <p>
        <span>Média de idade: </span>
        {idade_avg}
      </p>
      <p>
        <span>Extrativistas: </span>
        {ativ_extrativistas}
      </p>
      <p>
        <span>Pecuaristas: </span>
        {ativ_pecuaristas}
      </p>
    </div>
  );
}
