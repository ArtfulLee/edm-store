import { useState, useEffect, useRef } from "react";

/**
 * Компонент карточка
 * @param {object} props - Свойства компонента.
 * @param {object} props.details - Детали карточки.
 * @param {object} props.details.id - Идентификатор карточки.
 * @param {string} props.details.imgSrc - Путь к изображению.
 * @param {string} props.details.audioSrs - Путь к аудио.
 * @param {string} props.details.price - Цена аудио.
 * @param {string} props.details.trackName - Название композиции.
 * @param {string} props.details.artist - Имена артистов.
 * @param {string} props.details.genre - Жанр. (WIP)
 * @returns {JSX.Element} Элемент JSX.
 */
const Card = (props) => {
  const { imgSrc, audioSrs, price, trackName, artist } = props.details;

  // Ссылка на текущее аудио
  const audioSourse = useRef(new Audio(audioSrs));

  // Состояние проигрывания аудио вкл/выкл
  const [isPlaying, setIsPlaying] = useState(false);

  // Вкл/выкл трек на основании состояния аудио
  useEffect(() => {
    if (isPlaying) {
      audioSourse.current.play();
    } else {
      audioSourse.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <div className="bg-neutral-800 max-w-60 p-2">
        {/* Start Обложка аудио + элементы управления */}
        <div className="group relative">
          <img
            className="w-full md:w-72 block"
            src={imgSrc}
            alt="audio-cover"
          />
          <div className="absolute bg-black bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            {/* Start кнопка Play */}
            {isPlaying ? (
              <button
                className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                onClick={() => setIsPlaying(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="pause-circle-fill"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>
                </svg>
              </button>
            ) : (
              <button
                className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
                onClick={() => setIsPlaying(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="play-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                </svg>
              </button>
            )}
            {/* End кнопка Play */}
          </div>
        </div>
        {/* End Обложка аудио + элементы управления */}
        {/* Start Информация по карточке */}
        <div className="pt-2">
          <p className="line-clamp-1 text-neutral-50 text-lg">{trackName}</p>
          <p className="line-clamp-1 text-neutral-500">{artist}</p>
          <div>
            <button className="line-clamp-1 text-neutral-500">{price}</button>
          </div>
        </div>
        {/* End Информация по карточке */}
      </div>
    </>
  );
};

export default Card;
