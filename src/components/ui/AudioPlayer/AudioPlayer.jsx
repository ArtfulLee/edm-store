import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const AudioPlayer = () => {
  return (
    <>
      <div className="audio-player py-4">
        <div className="audio-player__inner">
          <PlayCircleIcon className="text-pink-400" />
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
