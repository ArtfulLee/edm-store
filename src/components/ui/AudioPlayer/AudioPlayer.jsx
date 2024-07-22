// React
import { useState, useRef } from "react";

// Сторы
import useMusicStore from "../../../store/useMusicStore";

// Компоненты
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

/**
 * Компонент Аудио плеер.
 * @returns {JSX.Element} Элемент JSX.
 */
const AudioPlayer = () => {
  // Получаем всю музыку из стора.
  const musicOfStore = useMusicStore((state) => state.musicOfStore);

  // Референс на ссылку аудио файла.
  const audioRef = useRef();
  // Референс на входные параметры прогрессбара.
  const progressBarRef = useRef();

  // Стейт для сохранения текущего индекса аудио файла.
  const [trackIndex, setTrackIndex] = useState(musicOfStore.length - 1);
  // Стейт для изменения текущего аудио файла.
  const [currentTrack, setCurrentTrack] = useState(musicOfStore[trackIndex]);
  // Стейт для отслеживания времени прогрессбара.
  const [timeProgress, setTimeProgress] = useState(0);
  // Стейт для хранения длительности аудио файла.
  const [duration, setDuration] = useState(0);

  // Получение длительности аудио файла в секундах.
  const onLoadedMetadata = () => {
    const timeOfAudio = audioRef.current.duration;
    // Устанавливаем длительность аудио файла
    setDuration(timeOfAudio);
    // Записываем значение "timeOfAudio" в атрибут "max" компонента progressBarRef
    progressBarRef.current.max = timeOfAudio;
  };

  // Обработчики для управления переключением между аудио файлами.
  // Т.к. массив аудио файлов в обратном порядке, то код по кнопкам Previous/Next поменял местами.
  const handlePrevious = () => {
    if (trackIndex >= musicOfStore.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(musicOfStore[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(musicOfStore[trackIndex + 1]);
    }
  };
  const handleNext = () => {
    if (trackIndex === 0) {
      let NextTrackIndex = musicOfStore.length - 1;
      setTrackIndex(NextTrackIndex);
      setCurrentTrack(musicOfStore[NextTrackIndex]);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(musicOfStore[trackIndex - 1]);
    }
  };

  return (
    <>
      <div className="bg-neutral-900 py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-between">
          <DisplayTrack
            currentTrack={currentTrack}
            audioRef={audioRef}
            progressBarRef={progressBarRef}
            setDuration={setDuration}
            handleNext={handleNext}
            onLoadedMetadata={onLoadedMetadata}
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
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            onLoadedMetadata={onLoadedMetadata}
          />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
