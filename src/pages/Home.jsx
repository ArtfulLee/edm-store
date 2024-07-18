import AudioCards from "../components/ui/AudioCards/AudioCards";

const Home = () => {
  return (
    <>
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold text-neutral-50">Home Page</h1>
        <p className="text-neutral-50">Welcome to the home page!</p>
      </div>
      {/* Отображаем карточки аудио файлов. */}
      <AudioCards />
    </>
  );
};

export default Home;
