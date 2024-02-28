"use client";

import React, { useState } from "react";
import MapSidebar from "./MapSidebar";
import MapComponent from "./MapComponent";
import { MangroveFeature } from "../constants/types";

export default function MapPage() {
  const [area, setArea] = useState<MangroveFeature | undefined>(undefined);

  return (
    <div className="flex flex-col md:flex-row w-screen h-[94vh]">
      <MapSidebar feature={area} />
      <MapComponent updateSideBar={setArea} />
    </div>
  );
}
