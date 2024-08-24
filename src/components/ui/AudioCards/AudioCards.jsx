// React
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import AudioCard from "../AudioCard/AudioCard";
import Alert from "../Alert/Alert";
import Table from "../Table/Table";

// Store
import useMusicStore from "../../../store/useMusicStore";
import useUsersStore from "../../../store/useUsersStore";

//constants
import { AUDIO__TEXTS } from "../../../constants/texts";

/**
 * Отрисовка карточек.
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioCards = ({ handleRowDoubleClick }) => {
  const { musicOfStore, fetchMusicFromDB } = useMusicStore((state) => ({
    musicOfStore: state.musicOfStore,
    fetchMusicFromDB: state.fetchMusicFromDB,
  }));

  const { onToggleFavorite, addAudioToCart } = useUsersStore((state) => ({
    onToggleFavorite: state.onToggleFavorite,
    addAudioToCart: state.addAudioToCart,
  }));

  // Получение текущего пути URL
  const currentPathURL = useLocation();

  useEffect(() => {
    fetchMusicFromDB();
  }, [fetchMusicFromDB]);

  // Стейт скрытия/показа и передачи сообщения в Alert.
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: "",
  });

  // Обработчик для стейт скрытия/показа и передачи сообщения в Alert.
  const handleCloseAlert = () => {
    setAlertState({ ...alertState, isOpen: false });
  };

  const [isFavorite, setFavorite] = useState(null);

  // Обработчик добавления товара в избранное и показа уведомления.
  const handleFavoriteAndShowAlert = (audioDetails) => {
    onToggleFavorite(audioDetails);

    // Получаем текущего пользователя
    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Проверяем, есть ли у него уже этот трек в избранных
    setFavorite({
      isFavorite: currentUser?.favoritesAudio.includes(audioDetails.id),
    });

    currentUser &&
      setAlertState({
        isOpen: true,
        title: "Info",
        message: isFavorite
          ? "Audio deleted from favorites."
          : "Audio added from favorites.",
      });
  };

  /**
   * Обработчик добавления аудио файла в корзину
   * @param {object} audioDetails
   */
  const handleAddAudioToCart = (audioDetails) => {
    addAudioToCart(audioDetails.id);
  };

  return (
    <>
      <section className="AudioCards">
        <div className="flex justify-start flex-wrap md:gap-2 lg:gap-2.5 xl:gap-3">
          {/* Возвращаем карточки аудио файлов на Home page. */}
          {currentPathURL.pathname === "/" &&
            !!musicOfStore.length &&
            musicOfStore
              .map((audioFile) => {
                // Получаем текущего пользователя
                const currentUser = JSON.parse(localStorage.getItem("user"));

                // Если пользователь есть, то исправить избранные
                if (currentUser) {
                  audioFile.isFavorite = currentUser?.favoritesAudio.includes(
                    audioFile.id
                  );
                }

                return (
                  <AudioCard
                    key={audioFile.id}
                    audioDetails={audioFile}
                    handleFavoriteAndShowAlert={handleFavoriteAndShowAlert}
                    handleAddAudioToCart={handleAddAudioToCart}
                  />
                );
              })
              .reverse()}

          {/* Возвращаем карточки аудио файлов на Favorites page. */}
          {currentPathURL.pathname === "/favorites" &&
            !!musicOfStore.length &&
            musicOfStore.map((audioFile) => {
              // Получаем текущего пользователя
              const currentUser = JSON.parse(localStorage.getItem("user"));

              // Если пользователь есть, то исправить избранные
              if (currentUser) {
                audioFile.isFavorite = currentUser?.favoritesAudio.includes(
                  audioFile.id
                );
              }

              if (audioFile.isFavorite) {
                return (
                  <AudioCard
                    key={audioFile.id}
                    audioDetails={audioFile}
                    handleFavoriteAndShowAlert={handleFavoriteAndShowAlert}
                    handleAddAudioToCart={handleAddAudioToCart}
                  />
                );
              }
            })}

          {/* Возвращаем карточки аудио файлов на Admin page. */}
          {currentPathURL.pathname === "/admin" && !!musicOfStore && (
            <Table
              musicOfStore={musicOfStore}
              headers={AUDIO__TEXTS}
              handleRowDoubleClick={handleRowDoubleClick}
              handleFavoriteAndShowAlert={handleFavoriteAndShowAlert}
            />
          )}

          {/* Возвращаем карточки аудио файлов на Cart page. */}
          {currentPathURL.pathname === "/cart" && !!musicOfStore && (
            <Table
              currentPathURL={currentPathURL}
              musicOfStore={musicOfStore}
              headers={AUDIO__TEXTS}
              handleFavoriteAndShowAlert={handleFavoriteAndShowAlert}
            />
          )}
        </div>
      </section>

      <Alert
        title={alertState?.title}
        subtitle={alertState?.message}
        variant="info"
        isOpen={alertState?.isOpen}
        onClose={handleCloseAlert}
      />
    </>
  );
};

export default AudioCards;
