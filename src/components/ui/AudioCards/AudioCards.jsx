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

  const { fetchUsersFromDB, onToggleFavorite } = useUsersStore((state) => ({
    fetchUsersFromDB: state.fetchUsersFromDB,
    onToggleFavorite: state.onToggleFavorite,
  }));

  // Получение текущего пути URL
  const currentPathURL = useLocation();

  useEffect(() => {
    fetchMusicFromDB();
    fetchUsersFromDB();
  }, [fetchMusicFromDB, fetchUsersFromDB, musicOfStore]);

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

    // Для отладки
    console.log(
      "isFavoritesAudio?",
      currentUser?.favoritesAudio.includes(audioDetails.id)
    );

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

  return (
    <>
      <section className="AudioCards">
        <div className="flex justify-between flex-wrap my-4">
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
                  />
                );
              })
              .reverse()}

          {/* Возвращаем карточки аудио файлов на Admin page. */}
          {currentPathURL.pathname === "/admin" && !!musicOfStore && (
            <Table
              musicOfStore={musicOfStore}
              headers={AUDIO__TEXTS}
              handleRowDoubleClick={handleRowDoubleClick}
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
