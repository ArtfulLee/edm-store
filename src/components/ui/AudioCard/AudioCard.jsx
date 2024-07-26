//Иконки
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

/**
 * Компонент карточка
 * @param {object} props - Свойства компонента.
 * @param {object} props.audioDetails - Детали карточки.
 * @param {string} props.audioDetails.id - Идентификатор карточки.
 * @param {string} props.audioDetails.imgSrc - Путь к изображению.
 * @param {string} props.audioDetails.audioSrs - Путь к аудио файлу.
 * @param {string} props.audioDetails.price - Цена аудио файла.
 * @param {string} props.audioDetails.nameOfTrack - Название композиции.
 * @param {string} props.audioDetails.artist - Имена артистов.
 * @param {string} props.audioDetails.genre - Жанр. (WIP)
 * @param {string} props.audioDetails.isFavorite - Добавлено в избранные или нет. (WIP)
 * @param {string} props.audioDetails.numberOfSales - Количество продаж (WIP)
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioCard = (props) => {
  const audioDetails = props.audioDetails;
  const { handleFavoriteAndShowAlert } = props;

  /* **************************************** */
  // Обработчик нажатия кнопку Play/Pause на карточке аудио файла.
  const handlePlayOnAudioCard = () => {
    // WIP
  };
  /* **************************************** */

  const handleFavorite = (event) => {
    // Предотвр. всплытие события.
    event.stopPropagation();

    handleFavoriteAndShowAlert && handleFavoriteAndShowAlert(audioDetails);
  };

  return (
    <>
      <div className="bg-neutral-700 sm:max-w-full md:max-w-60  p-2 mb-4">
        {/* Start Обложка аудио файла + элементы управления. */}
        <div className="group relative">
          <img
            className="w-full block"
            src={audioDetails.imgSrc}
            alt="audio-cover"
          />
          <div className="text-3xl absolute bg-black bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            {/* Start кнопка Play. */}
            <button
              className="hover:scale-125 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
              onClick={() => handlePlayOnAudioCard(audioDetails)}
            >
              <PlayArrowIcon fontSize="large" />
            </button>
            {/* End кнопка Play. */}
          </div>
        </div>
        {/* End Обложка аудио файла + элементы управления. */}
        {/* Start Информация по карточке. */}
        <div className="py-2">
          <p className="line-clamp-1 text-neutral-50 text-lg">
            {audioDetails.nameOfTrack}
          </p>
          <p className="line-clamp-1 text-neutral-400">{audioDetails.artist}</p>
        </div>
        <div className="flex justify-end">
          {/* Start Кнопка добавления аудио яайла в избранные. */}
          <button
            className="flex items-center space-x-2 line-clamp-1 p-2 text-neutral-50 bg-neutral-500"
            onClick={handleFavorite}
          >
            {audioDetails.isFavorite ? (
              <FavoriteIcon fontSize="small" className="text-pink-500" />
            ) : (
              <FavoriteIcon fontSize="small" />
            )}
          </button>
          {/* End Кнопка добавления аудио яайла в избранные. */}
          {/* start Кнопка для покупки аудио файла. */}
          <button className="flex items-center space-x-2 line-clamp-1 p-2 text-neutral-50 bg-pink-500">
            <div className="font-semibold">{audioDetails.price}</div>
            <ShoppingCartIcon fontSize="small" />
          </button>
          {/* End Кнопка для покупки аудио файла. */}
        </div>
        {/* End Информация по карточке. */}
      </div>
    </>
  );
};

export default AudioCard;
