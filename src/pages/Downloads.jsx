//components
import AudioCards from "../components/ui/AudioCards/AudioCards";

const Downloads = () => {
  return (
    <>
      <div className="container flex mx-auto my-4 space-x-16">
        <h2 className="text-2xl font-bold text-neutral-50">My downloads</h2>
      </div>
      <AudioCards />
    </>
  );
};

export default Downloads;
