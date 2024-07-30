// utility
import { nanoid } from "nanoid";

//Иконки
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";

/**
 * Компонент таблицы.
 * @param {object} props - Свойства компонента.
 * @param {Array} props.headerData - Массив объектов (названия столбцов в шапке таблицы).
 * @param {Array} props.data - Массив объектов (содержимое таблицы).
 * @returns {JSX.Element} Элемент JSX.
 */
const Table = ({ data, headers }) => {
  console.log("data", data);
  console.log("headers", headers);
  console.log("headers.audioSrc", headers.audioSrc);

  return (
    <>
      <div className="flex flex-col w-full space-y-1 text-neutral-50">
        {/* Start Headers */}
        <div className="flex w-full border-t border-neutral-700 text-neutral-400">
          <div className="w-2/12 p-1 line-clamp-1"></div>
          <div className="w-full p-1 line-clamp-1">
            {headers.title} / {headers.artist}
          </div>
          <div className="w-1/12 p-1 line-clamp-1">{headers.genre}</div>
          <div className="w-2/12 p-1 line-clamp-1">{headers.label}</div>
          <div className="w-1/12 p-1 line-clamp-1">{headers.price}</div>
        </div>
        {/* End Headers */}

        {/* Start TableRow */}
        <div className="flex w-full bg-neutral-700">
          <div className="flex items-center w-2/12 p-1   space-x-1">
            <div className="w-10 aspect-square">
              <img className="block" src={data[0].imgSrc} alt="" />
            </div>

            <button className="transition duration-100 w-10 aspect-square text-neutral-400 hover:text-neutral-50">
              <PlayArrowIcon fontSize="large" />
            </button>
            <button className="transition duration-100 w-10 aspect-square text-neutral-400 hover:text-neutral-50">
              <FavoriteIcon />
            </button>
          </div>

          <div className="w-full p-1 text-neutral-50">
            <div className="font-semibold line-clamp-1">{data[0].title}</div>
            <div className="text-sky-400 line-clamp-1">{data[0].artist}</div>
          </div>
          <div className="flex items-center w-1/12 p-1  line-clamp-1">
            {data[0].genre}
          </div>
          <div className="flex items-center w-2/12 p-1  line-clamp-1">
            {data[0].label}
          </div>
          <div className="flex items-center w-1/12 p-1  line-clamp-1">
            {data[0].price}
          </div>
        </div>
        {/* End TableRow */}
      </div>
    </>
  );
};

export default Table;
