import AudioCard from "../AudioCard/AudioCard";
import useMusicStore from "../../../store/useMusicStore";

/**
 * Отрисовка карточек
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioCards = () => {
  const allMusicOfStore = useMusicStore((state) => state.allMusicOfStore);

  console.log("array", allMusicOfStore);

  return (
    <>
      <div className="flex justify-between flex-wrap py-4">
        {!!allMusicOfStore.length &&
          allMusicOfStore.map((track) => {
            return <AudioCard key={track.idOfTrack} details={track} />;
          })}
      </div>
    </>
  );
};

export default AudioCards;
