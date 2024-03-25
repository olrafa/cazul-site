"use client";

import React, { useState } from "react";

import { MunicipalityPopData } from "../constants/types";

import MapComponent from "./MapComponent";
import MapSidebar from "./MapSidebar";
import Navbar from "./Navbar";

export default function MapPage() {
  const [municipality, setMunicipality] = useState<
    MunicipalityPopData | undefined
  >(undefined);

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      <div className="w-1/6">
        <Navbar />
        <MapSidebar municipality={municipality} />
      </div>
      <MapComponent updateSideBar={setMunicipality} />
    </div>
  );
}
