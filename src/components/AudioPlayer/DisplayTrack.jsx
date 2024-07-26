/**
 * Компонент отображения текущей информации об аудио файле.
 * @param {object} props - Свойства компонента.
 * @param {object} props.audioRef - Референс на текущий объект аудио файла.
 * @param {function} props.setDuration - Функция для обработки длительности аудио файла.
 * @param {object} props.progressBarRef - Референс на входные параметры прогрессбара.
 * @param {function} props.handleNext - Обработчик для переключения на следующий аудиофайл.
 * @param {object} props.currentTrack - Детали карточки.
 * @param {string} props.currentTrack.id - Идентификатор карточки.
 * @param {string} props.currentTrack.imgSrc - Путь к изображению.
 * @param {string} props.currentTrack.audioSrs - Путь к аудио файлу.
 * @param {string} props.currentTrack.price - Цена аудио файла.
 * @param {string} props.currentTrack.nameOfTrack - Название композиции.
 * @param {string} props.currentTrack.artist - Имена артистов.
 * @param {string} props.currentTrack.genre - Жанр. (WIP)
 * @param {string} props.currentTrack.label - Лейбл. (WIP)
 * @param {string} props.currentTrack.isFavorite - Добавлено в избранные или нет. (WIP)
 * @param {string} props.currentTrack.numberOfSales - Количество продаж (WIP)
 * @returns {JSXElement}
 */
const DisplayTrack = (props) => {
  const { currentTrack, audioRef, handleNext, onLoadedMetadata } = props;

  return (
    <>
      {/* Текущий аудио файл для воспроизведения. */}
      <audio
        src={currentTrack?.audioSrs}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        hidden /* А так можно? */
      />

      {/* Данные аудио файла */}
      <div className="flex space-x-2">
        <div className="w-20 h-20 flex justify-center justify-items-center">
          {currentTrack?.imgSrc ? (
            <img
              className="block"
              src={currentTrack?.imgSrc}
              alt="audio-cover"
            />
          ) : (
            /* Дивку надо будет заменить на "компонент заглушку" для отсутсвующих картинок. */
            <div className="content-center text-center outline outline-1 outline-neutral-400 w-full h-full text-neutral-50 bg-neutral-800">
              No cover
            </div>
          )}
        </div>
        <div className="w-52 max-w-52">
          <div className="line-clamp-1 text-neutral-50 text-lg">
            {currentTrack?.nameOfTrack}
          </div>
          <div className="line-clamp-1 text-neutral-400">
            {currentTrack?.artist}
          </div>
          <div className="line-clamp-1 text-neutral-400">
            {currentTrack?.label}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayTrack;
