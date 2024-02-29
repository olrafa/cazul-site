"use client";

import React, { useState } from "react";

import { MangroveFeature } from "../constants/types";

import MapComponent from "./MapComponent";
import MapSidebar from "./MapSidebar";
import Navbar from "./Navbar";

export default function MapPage() {
  const [area, setArea] = useState<MangroveFeature | undefined>(undefined);

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      <div className="w-1/6">
        <Navbar />
        <MapSidebar feature={area} />
      </div>
      <MapComponent updateSideBar={setArea} />
    </div>
  );
}
