import Card from "./components/ui/Card/Card";
import libraryOfMusic from "./temp/data";

const App = () => {
  console.log(libraryOfMusic)
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-between">
          {!!libraryOfMusic &&
            libraryOfMusic.map((track) => {
              <Card details={track} />;
            })}
        </div>
      </div>
    </>
  );
};

export default App;
