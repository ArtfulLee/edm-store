import AudioCards from "../components/ui/AudioCards/AudioCards";

const Home = () => {
  return (
    <>
      <div className="container mx-auto my-4">
        <h1 className="text-2xl font-bold text-neutral-50">New on EDM Store</h1>
      </div>
      {/* Отображаем карточки аудио файлов. */}
      <AudioCards />
    </>
  );
};

export default Home;
