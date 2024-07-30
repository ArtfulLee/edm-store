// React
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import AudioCard from "../AudioCard/AudioCard";
import Alert from "../Alert/Alert";
import Table from "../Table/Table";

// Store
import useMusicStore from "../../../store/useMusicStore";

//constants
import { AUDIO__TEXTS } from "../../../constants/texts";

/**
 * Отрисовка карточек.
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioCards = () => {
  const {
    musicOfStore,
    fetchMusicFromDB,
    getAudioFileByIdOfTrack,
    onToggleFavorite,
  } = useMusicStore((state) => ({
    musicOfStore: state.musicOfStore,
    fetchMusicFromDB: state.fetchMusicFromDB,
    getAudioFileByIdOfTrack: state.getAudioFileByIdOfTrack,
    onToggleFavorite: state.onToggleFavorite,
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

  // Обработчик добавления товара в избранное и показа уведомления.
  const handleFavoriteAndShowAlert = (audioDetails) => {
    // Достаем из стора поле isFavorite выбранного продукта.
    const { isFavorite } = getAudioFileByIdOfTrack(audioDetails.id);

    // Меняет состояние isFavorite у выбранного аудио файла.
    onToggleFavorite(audioDetails);

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
            <Table musicOfStore={musicOfStore} headers={AUDIO__TEXTS} />
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
