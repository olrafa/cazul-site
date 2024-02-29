"use client";

import React, { useState } from "react";

import { MangroveFeature } from "../constants/types";

import MapComponent from "./MapComponent";
import MapSidebar from "./MapSidebar";

export default function MapPage() {
  const [area, setArea] = useState<MangroveFeature | undefined>(undefined);

  return (
    <div className="flex flex-col md:flex-row w-screen h-[94vh]">
      <MapSidebar feature={area} />
      <MapComponent updateSideBar={setArea} />
    </div>
  );
}
