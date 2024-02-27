"use client";

import React, { useState } from "react";
import MapSidebar from "./MapSidebar";
import MapComponent from "./MapComponent";

export default function MapPage() {
  const [areaName, setAreaName] = useState("");

  return (
    <div className="flex flex-col md:flex-row w-screen h-[94vh]">
      <MapSidebar name={areaName} />
      <MapComponent updateSideBar={setAreaName} />
    </div>
  );
}
