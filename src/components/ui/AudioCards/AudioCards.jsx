import AudioCard from "../AudioCard/AudioCard";
import useMusicStore from "../../../store/useMusicStore";

/**
 * Отрисовка карточек
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioCards = () => {
  // Получаем всю музыку со стора
  const musicOfStore = useMusicStore((state) => state.musicOfStore);

  return (
    <>
      <div className="flex justify-between flex-wrap my-4">
        {/* Возвращаем карточки аудио файлов */}
        {!!musicOfStore.length &&
          musicOfStore.map((track) => {
            return <AudioCard key={track.idOfTrack} details={track} />;
          })}
      </div>
    </>
  );
};

export default AudioCards;
