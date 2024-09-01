// components
import AudioCards from "../components/ui/AudioCards/AudioCards";

const Home = () => {
  return (
    <>
      <div className="container mx-auto my-4">
        <h2 className="text-2xl font-bold text-neutral-50">New on EDM Store</h2>
      </div>
      {/* Отображаем карточки аудио файлов. */}
      <AudioCards />
    </>
  );
};

export default Home;
