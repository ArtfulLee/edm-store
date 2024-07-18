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
  // Получаем всю музыку из стора.
  const allMusicOfStore = useMusicStore((state) => state.allMusicOfStore);

  // Референс на ссылку аудио файла.
  const audioRef = useRef();
  // Референс на входные параметры прогрессбара.
  const progressBarRef = useRef();

  // Стейт для изменения текущего аудио файла.
  const [currentTrack, setCurrentTrack] = useState(allMusicOfStore[0]);
  // Стейт для отслеживания времени прогрессбара.
  const [timeProgress, setTimeProgress] = useState(0);
  // Стейт для хранения длительности аудио файла.
  const [duration, setDuration] = useState(0);

  return (
    <>
      <div className="bg-neutral-900 py-4">
        <div className="flex flex-wrap justify-center space-x-8">
          <DisplayTrack
            currentTrack={currentTrack}
            audioRef={audioRef}
            progressBarRef={progressBarRef}
            setDuration={setDuration}
          />
          <ProgressBar
            audioRef={audioRef}
            progressBarRef={progressBarRef}
            timeProgress={timeProgress}
            duration={duration}
          />
          <Controls
            audioRef={audioRef}
            progressBarRef={progressBarRef}
            duration={duration}
            setTimeProgress={setTimeProgress}
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
