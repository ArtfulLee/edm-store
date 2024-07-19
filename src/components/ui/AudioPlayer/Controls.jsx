// React
import { useState, useEffect, useRef, useCallback } from "react";

// Иконки
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

/**
 * Компонент управления аудио файла плеером.
 * @returns {JSX.Element} Элемент JSX.
 */
const Controls = (props) => {
  const {
    audioRef,
    progressBarRef,
    duration,
    handlePrevious,
    handleNext,
    setTimeProgress,
  } = props;

  // Стейт для управления Play/Pause.
  const [isPlaying, setIsPlaying] = useState(false);

  // Стейт для управления громкостью аудио файла.
  const [volume, setVolume] = useState(57);

  // Стейт для управления отключения звука
  const [muteVolume, setMuteVolume] = useState(false);

  // Изменение отображения кнопок Play/Pause.
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Референс для сохранения положения анимации прогрессбара.
  const playAnimationRef = useRef();

  // Функция для перерисовки анимации прогрессбара.
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

  // Изменение состояния воспроизведения аудио файла от изменений зависимостей "стейта для управления Play/Pause" или "референса на аудио файл".
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  // Изменение уровня громкости аудиофайла от изменений зависимостей "значения уровня громкости стейта изменения уровня громкости" или "референса на аудио файл".
  useEffect(() => {
    if (audioRef) {
      // Поделили на 100 для синхронизации с инпутом.
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <>
      <div className="flex items-center space-x-2">
        {/* Предыдущий аудио файл. */}
        <button>
          <SkipPreviousIcon
            className="text-neutral-50"
            fontSize="large"
            onClick={handlePrevious}
          />
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

        {/* Следующий аудио файл. */}
        <button>
          <SkipNextIcon
            className="text-neutral-50"
            fontSize="large"
            onClick={handleNext}
          />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="content-center text-center w-full h-full"
          onClick={() => setMuteVolume((prev) => !prev)}
        >
          {muteVolume || volume < 1 ? (
            <VolumeOffIcon className="text-neutral-50" fontSize="large" />
          ) : volume < 40 ? (
            <VolumeDownIcon className="text-neutral-50" fontSize="large" />
          ) : (
            <VolumeUpIcon className="text-neutral-50" fontSize="large" />
          )}
        </button>
        <input
          className="accent-emerald-400"
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(event) => setVolume(event.target.value)}
        />
      </div>
    </>
  );
};

export default Controls;
