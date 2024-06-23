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
 * @returns {JSX.Element} Элемент JSX.
 */
const Card = (props) => {
  const { imgSrc, /* audioSrs, */ price, trackName, artist } = props.details;

  return (
    <>
      <div className="bg-gray-900">
        <div className="group relative">
          <img
            className="w-full md:w-72 block"
            src={imgSrc}
            alt="Audio Cover"
          />
          <div className="absolute bg-black bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
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
          </div>
        </div>
        <div className="p-4">
          <p className="text-white text-lg">{trackName}</p>
          <p className="text-gray-400">{artist}</p>
          <div>
            <div className="text-gray-400">{price}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
