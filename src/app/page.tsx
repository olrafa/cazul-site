import Image from "next/image";
import MapComponent from "./components/MapComponent";
import MapSidebar from "./components/MapSidebar";
import IntroText from "./components/IntroText";

export default function Home() {
  return (
    <main>
      <section
        className="flex flex-col md:flex-row w-screen h-screen"
        id="mapa"
      >
        <MapSidebar />
        <MapComponent />
      </section>
      <section>
        <IntroText />
      </section>
    </main>
  );
}
