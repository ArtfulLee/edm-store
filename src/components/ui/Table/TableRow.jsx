//Иконки
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";

/**
 * Компонент строка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {Array} props.headerData - Массив объектов (названия столбцов в шапке таблицы).
 * @param {Array} props.data - Массив объектов (содержимое таблицы).
 * @returns {JSX.Element} Элемент JSX.
 */
const TableRow = ({ audioFile }) => {
  console.log("audioFile", audioFile);
  return (
    <>
      <div className="flex w-full bg-neutral-700 hover:bg-neutral-600">
        <div className="flex items-center w-2/12 p-1   space-x-1">
          <div className="w-10 aspect-square">
            <img className="block" src={audioFile.imgSrc} alt="" />
          </div>

          <button className="transition duration-100 w-10 aspect-square text-neutral-400 hover:text-neutral-50">
            <PlayArrowIcon fontSize="large" />
          </button>
          <button className="transition duration-100 w-10 aspect-square text-neutral-400 hover:text-neutral-50">
            <FavoriteIcon />
          </button>
        </div>

        <div className="w-full p-1 text-neutral-50">
          <div className="font-semibold line-clamp-1">{audioFile.title}</div>
          <div className="text-sky-400 line-clamp-1">{audioFile.artist}</div>
        </div>
        <div className="flex items-center w-1/12 p-1">
          <p className="line-clamp-1">{audioFile.genre}</p>
        </div>
        <div className="flex items-center w-2/12 p-1">
          <p className="line-clamp-1">{audioFile.label}</p>
        </div>
        <div className="flex items-center w-1/12 p-1">
          <p className="line-clamp-1">{audioFile.price}</p>
        </div>
      </div>
    </>
  );
};

export default TableRow;
