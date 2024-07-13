import AudioCard from "../AudioCard/AudioCard";
import useMusicStore from "../../../store/useMusicStore";

/**
 * Отрисовка карточек
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioCards = () => {
  // Получаем всю музыку со стора
  const allMusicOfStore = useMusicStore((state) => state.allMusicOfStore);

  return (
    <>
      <div className="flex justify-between flex-wrap py-4">
        {/* Возвращаем аудио карточки */}
        {!!allMusicOfStore.length &&
          allMusicOfStore.map((track) => {
            return <AudioCard key={track.idOfTrack} details={track} />;
          })}
      </div>
    </>
  );
};

export default AudioCards;
