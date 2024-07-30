// components
import TableRow from "./TableRow";

/**
 * Компонент таблицы.
 * @param {object} props - Свойства компонента.
 * @param {Array} props.headerData - Массив объектов (названия столбцов в шапке таблицы).
 * @param {Array} props.data - Массив объектов (содержимое таблицы).
 * @returns {JSX.Element} Элемент JSX.
 */
const Table = ({ musicOfStore, headers }) => {
  return (
    <>
      <div className="flex flex-col w-full space-y-1 text-neutral-50">
        {/* Start Headers */}
        <div className="flex w-full border-t border-neutral-700 text-neutral-400">
          <div className="w-2/12 p-1 line-clamp-1"></div>
          <div className="w-full p-1 line-clamp-1">
            {headers.title} / {headers.artist}
          </div>
          <div className="w-1/12 p-1 ">
            <p className="line-clamp-1">{headers.genre}</p>
          </div>
          <div className="w-2/12 p-1 ">
            <p className="line-clamp-1">{headers.label}</p>
          </div>
          <div className="w-1/12 p-1 ">
            <p className="line-clamp-1">{headers.price}</p>
          </div>
        </div>
        {/* End Headers */}
        {console.log("musicOfStore", musicOfStore)}
        {!!musicOfStore &&
          musicOfStore.map((audioFile) => {
            return <TableRow key={audioFile.id} audioFile={audioFile} />;
          })}
      </div>
    </>
  );
};

export default Table;
