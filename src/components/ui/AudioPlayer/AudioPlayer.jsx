// React
import { useState, useRef } from "react";

// Сторы
import useMusicStore from "../../../store/useMusicStore";

// Компоненты
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

/**
 * Компонент Аудио плеер
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioPlayer = () => {
  // Получаем всю музыку из стора
  const allMusicOfStore = useMusicStore((state) => state.allMusicOfStore);

  // Стейт для изменения текущего трека
  const [currentTrack, setCurrentTrack] = useState(allMusicOfStore[0]);

  // Референс на ссылку аудио
  const audioRef = useRef();
  console.log("Текущий объект React DOM <audio>", audioRef);

  return (
    <>
      <div className="py-4">
        <div className="flex justify-center">
          <DisplayTrack currentTrack={currentTrack} audioRef={audioRef} />
          <Controls audioRef={audioRef} />
          <ProgressBar />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
