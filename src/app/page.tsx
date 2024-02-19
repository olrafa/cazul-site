import Image from "next/image";
import MapComponent from "./components/MapComponent";
import MapSidebar from "./components/MapSidebar";

export default function Home() {
  return (
    <main className="flex flex-row">
      <MapSidebar />
      <MapComponent />
    </main>
  );
}
