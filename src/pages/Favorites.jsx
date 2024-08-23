// components
import AudioCards from "../components/ui/AudioCards/AudioCards";

const Favorites = () => {
  return (
    <>
      <div className="container mx-auto my-4">
        <h1 className="text-2xl font-bold text-neutral-50">
          My favorite music
        </h1>
      </div>
      <AudioCards />
    </>
  );
};

export default Favorites;
