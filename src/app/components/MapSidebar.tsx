import React from "react";

type MapSidebarProps = {
  name: string;
};

export default function MapSidebar({ name }: MapSidebarProps) {
  return <div className="w-1/6">{name}</div>;
}
