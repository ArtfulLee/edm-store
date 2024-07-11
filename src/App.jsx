import AudioPlayer from "./components/ui/AudioPlayer/AudioPlayer";
import Header from "./components/ui/Header/Header";
import Footer from "./components/ui/Footer/Footer";

const App = () => {
  return (
    <>
      <div className=" bg-neutral-800 h-screen w-screen">
        <Header />
        <div className="container mx-auto px-4">
          <section className="audio-player-section">
            <AudioPlayer />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
