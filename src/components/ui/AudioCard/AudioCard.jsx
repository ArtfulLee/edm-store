import { useState, useEffect, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

/**
 * Компонент карточка
 * @param {object} props - Свойства компонента.
 * @param {object} props.details - Детали карточки.
 * @param {string} props.details.idOfTrack - Идентификатор карточки.
 * @param {string} props.details.imgSrc - Путь к изображению.
 * @param {string} props.details.audioSrs - Путь к аудио файлу.
 * @param {string} props.details.price - Цена аудио файла.
 * @param {string} props.details.nameOfTrack - Название композиции.
 * @param {string} props.details.artist - Имена артистов.
 * @param {string} props.details.genre - Жанр. (WIP)
 * @param {string} props.details.isFavorite - Добавлено в избранные или нет. (WIP)
 * @param {string} props.details.numberOfSales - Количество продаж (WIP)
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioCard = (props) => {
  const { imgSrc, audioSrs, price, nameOfTrack, artist } = props.details;

  // Ссылка на текущий аудио файл.
  const audioSourse = useRef(new Audio(audioSrs));

  // Состояние проигрывания аудио файла, вкл/выкл.
  const [isPlaying, setIsPlaying] = useState(false);

  // Вкл/выкл аудио файл на основании состояния аудио файла.
  useEffect(() => {
    if (isPlaying) {
      audioSourse.current.play();
    } else {
      audioSourse.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <div className="bg-neutral-700 max-w-60 p-2 mb-4">
        {/* Start Обложка аудио файла + элементы управления. */}
        <div className="group relative">
          <img className="w-full block" src={imgSrc} alt="audio-cover" />
          <div className="text-3xl absolute bg-black bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            {/* Start кнопка Play. */}
            {isPlaying ? (
              <button
                className="hover:scale-125 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                onClick={() => setIsPlaying(false)}
              >
                <PauseIcon fontSize="large" />
              </button>
            ) : (
              <button
                className="hover:scale-125 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                onClick={() => setIsPlaying(true)}
              >
                <PlayArrowIcon fontSize="large" />
              </button>
            )}
            {/* End кнопка Play. */}
          </div>
        </div>
        {/* End Обложка аудио файла + элементы управления. */}
        {/* Start Информация по карточке. */}
        <div className="pt-2">
          <p className="line-clamp-1 text-neutral-50 text-lg">{nameOfTrack}</p>
          <p className="line-clamp-1 text-neutral-400">{artist}</p>
          <div>
            <button className="line-clamp-1 text-neutral-400">{price}</button>
          </div>
        </div>
        {/* End Информация по карточке. */}
      </div>
    </>
  );
};

export default AudioCard;
