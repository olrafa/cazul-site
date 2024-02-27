import MapComponent from "./components/MapComponent";
import MapSidebar from "./components/MapSidebar";
import IntroText from "./components/IntroText";
import MapPage from "./components/MapPage";

export default function Home() {
  return (
    <main>
      <section id="mapa">
        <MapPage />
      </section>
      <section id="intro-text">
        <IntroText />
      </section>
    </main>
  );
}
