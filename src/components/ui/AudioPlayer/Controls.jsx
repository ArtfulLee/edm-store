// React
import { useState, useEffect, useRef, useCallback } from "react";

// Иконки
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

/**
 * Компонент управления аудио плеером.
 * @returns {JSX.Element} Элемент JSX.
 */
const Controls = (props) => {
  const { audioRef, progressBarRef, duration, setTimeProgress } = props;

  // Стейт для управления Play/Pause.
  const [isPlaying, setIsPlaying] = useState(false);

  // Изменение отображения кнопок Play/Pause.
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Референс для сохранения положения анимации прогрессбара.
  const playAnimationRef = useRef();

  // Функция для .
  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  // Изменение состояния воспроизведения аудио от зависимости изменения стейта для управления Play/Pause или изменения референса на ссылку аудио.
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <>
      <div className="flex items-center space-x-2">
        {/* Предыдущий трек. */}
        <button>
          <SkipPreviousIcon className="text-neutral-50" fontSize="large" />
        </button>

        {/* Переключение кнопок Play/Pause. */}
        <button
          className="rounded-full w-12 h-12 bg-neutral-700"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <PauseIcon className="text-neutral-50" fontSize="large" />
          ) : (
            <PlayArrowIcon className="text-neutral-50" fontSize="large" />
          )}
        </button>

        {/* Следующий трек. */}
        <button>
          <SkipNextIcon className="text-neutral-50" fontSize="large" />
        </button>
      </div>
    </>
  );
};

export default Controls;
