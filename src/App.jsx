import Card from "./components/ui/Card/Card";
import libraryOfMusic from "./temp/data";

const App = () => {
  console.log(libraryOfMusic);
  return (
    <>
      <div className=" bg-neutral-900 h-screen w-screen">
        <div className="container mx-auto p-4">
          {/* Временная секция */}
          <section className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-between">
              {!!libraryOfMusic &&
                libraryOfMusic.map((audioDetails) => (
                  <Card key={audioDetails.id} details={audioDetails} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default App;
