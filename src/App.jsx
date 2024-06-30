import AudioPlayer from "./components/ui/AudioPlayer/AudioPlayer";

const App = () => {
  return (
    <>
      <div className=" bg-neutral-900 h-screen w-screen">
        <div className="container mx-auto p-4">
          <section className="audio-player-section">
            <AudioPlayer />
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
