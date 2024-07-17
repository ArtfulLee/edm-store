/**
 * Компонент отображения текущей информации об аудио.
 * @param {object} props - Свойства компонента.
 * @param {object} props.audioRef - Референс на текущий объект аудио.
 * @param {object} props.currentTrack - Детали карточки.
 * @param {string} props.currentTrack.idOfTrack - Идентификатор карточки.
 * @param {string} props.currentTrack.imgSrc - Путь к изображению.
 * @param {string} props.currentTrack.audioSrs - Путь к аудио.
 * @param {string} props.currentTrack.price - Цена аудио.
 * @param {string} props.currentTrack.nameOfTrack - Название композиции.
 * @param {string} props.currentTrack.artist - Имена артистов.
 * @param {string} props.currentTrack.genre - Жанр. (WIP)
 * @param {string} props.currentTrack.label - Лейбл. (WIP)
 * @param {string} props.currentTrack.isFavorite - Добавлено в избранные или нет. (WIP)
 * @param {string} props.currentTrack.numberOfSales - Количество продаж (WIP)
 * @returns {JSXElement}
 */
const DisplayTrack = (props) => {
  const { currentTrack, audioRef } = props;

  console.log(currentTrack);

  return (
    <>
      {/* Текущий трек для воспроизведения. */}
      <audio src={currentTrack.audioSrs} ref={audioRef} />

      {/* Данные аудио */}
      <div>
        <div className="text-neutral-50">{currentTrack.nameOfTrack}</div>
        <div className="text-neutral-50">{currentTrack.artist}</div>
        <div className="text-neutral-50">{currentTrack.label}</div>
      </div>
    </>
  );
};

export default DisplayTrack;
