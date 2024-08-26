// components
import TableRow from "./TableRow";

// constants
import { AUDIO__TEXTS } from "../../../constants/texts";

/**
 * Компонент таблицы.
 * @param {object} props - Свойства компонента.
 * @param {Array} props.headerData - Массив объектов (названия столбцов в шапке таблицы).
 * @param {Array} props.data - Массив объектов (содержимое таблицы).
 * @returns {JSX.Element} Элемент JSX.
 */
const Table = ({
  currentPathURL,
  musicOfStore,
  headers,
  handleRowDoubleClick,
  handleFavoriteAndShowAlert,
  handleDeleteAudioFromCart,
}) => {
  // Получаем текущего пользователя.
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Переменная для хранения аудио для корзины.
  const audioForCartPage = musicOfStore.filter((audioFile) =>
    currentUser?.audioFromCart.includes(audioFile.id)
  );

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
            <p className="line-clamp-1">{headers.price}{AUDIO__TEXTS.currency}</p>
          </div>
          {currentPathURL?.pathname === "/cart" && (
            <div className="w-1/12 p-1 ">
              <p className="line-clamp-1">{headers.cartActions}</p>
            </div>
          )}
        </div>
        {/* End Headers */}

        {/* Для Favorites page */}
        {!!musicOfStore &&
          currentPathURL?.pathname === "/admin" &&
          musicOfStore
            .map((audioFile) => {
              // Если пользователь есть, то исправить избранные
              if (currentUser) {
                audioFile.isFavorite = currentUser?.favoritesAudio.includes(
                  audioFile.id
                );
              }
              return (
                <TableRow
                  key={audioFile.id}
                  currentPathURL={currentPathURL}
                  audioFile={audioFile}
                  handleRowDoubleClick={handleRowDoubleClick}
                  handleFavoriteAndShowAlert={handleFavoriteAndShowAlert}
                  handleDeleteAudioFromCart={handleDeleteAudioFromCart}
                />
              );
            })
            .reverse()}

        {/* Для Cart page */}
        {!!audioForCartPage &&
          currentPathURL?.pathname === "/cart" &&
          audioForCartPage
            .map((audioFile) => {
              // Если пользователь есть, то исправить избранные
              if (currentUser) {
                audioFile.isFavorite = currentUser?.favoritesAudio.includes(
                  audioFile.id
                );

                return (
                  <TableRow
                    key={audioFile.id}
                    currentPathURL={currentPathURL}
                    audioFile={audioFile}
                    handleRowDoubleClick={handleRowDoubleClick}
                    handleFavoriteAndShowAlert={handleFavoriteAndShowAlert}
                    handleDeleteAudioFromCart={handleDeleteAudioFromCart}
                  />
                );
              }
            })
            .reverse()}
      </div>
    </>
  );
};

export default Table;
