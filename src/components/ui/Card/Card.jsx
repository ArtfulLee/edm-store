/**
 * Компонент карточка
 * @param {object} props - Свойства компонента.
 * @param {object} props.details - Детали карточки.
 * @param {string} props.details.imgSrc - Путь к изображению.
 * @param {string} props.details.audioSrs - Путь к аудио.
 * @param {string} props.details.price - Цена карточки.
 * @param {string} props.details.trackName - Название композиции.
 * @param {string} props.details.artist - Имена артистов.
 * @returns {JSX.Element} Элемент JSX.
 */
export const Card = (props) => {
  const { imgSrc, audioSrs, price, trackName, artist } = props.details;

  return (
    <>
      <div>{imgSrc}</div>
    </>
  );
};
