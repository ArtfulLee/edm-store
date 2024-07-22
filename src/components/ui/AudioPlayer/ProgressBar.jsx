// utils
import { formatTime } from "../../../utils/formatTime";

/**
 * Компонент Прогрессбар.
 * @param {*} props
 * @returns {JSX.Element} Элемент JSX.
 */
const ProgressBar = (props) => {
  const { progressBarRef, audioRef, timeProgress, duration } = props;

  // Обработчик для отслеживания изменения входных значений прогрессбара.
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  return (
    <>
      <div className="flex items-center text-neutral-50 ">
        <div className="flex space-x-2">
          <span>{formatTime(timeProgress)}</span>
          <input
            className="accent-emerald-400"
            type="range"
            ref={progressBarRef}
            defaultValue="0"
            onChange={handleProgressChange}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
