// React
import { useEffect } from "react";

// Иконки
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";

//  Стили для variant
const variantClasses = {
  info: "border-l-4 border-neutral-50 bg-neutral-500 text-neutral-50",
  warning: "border-l-4 border-yellow-400 bg-neutral-500 text-neutral-50",
  success: "border-l-4 border-emerald-400 bg-neutral-500 text-neutral-50",
  error: "border-l-4 border-red-400 bg-neutral-500 text-neutral-50",
  neutral: "border-l-4 border-neutral-400 bg-neutral-500 text-neutral-50",
};

// Варианты иконок
const defaultIconVariants = {
  info: <InfoIcon className="text-neutral-50" />,
  warning: <WarningIcon className="text-yellow-400" />,
  success: <CheckCircleIcon className="text-emerald-400" />,
  error: <ErrorIcon className="text-red-400" />,
};

// Стили для align
const alignClasses = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
};

/**
 * Компонент уведомления.
 * @param {object} props - Свойства компонента.
 * @param {string} [props.variant="info"] - Вариант компонента (info, warning, success, error).
 * @param {string} [props.align="bottom-left"] - Позиционирование компонента.
 * @param {string} props.title - Заголовок компонента.
 * @param {string} props.subtitle - Подзаголовок компонента.
 * @param {boolean} props.isOpen - Компонент показан/скрыт.
 * @param {function} props.onClose - Обработчик закрытия компонента (необязательно).
 * @param {React.ReactNode} props.icon - Пользовательская иконка (необязательно).
 * @returns {JSX.Element} Элемент JSX.
 */
const Alert = ({
  variant = "info",
  isOpen,
  icon,
  title,
  subtitle,
  align = "bottom-left",
  onClose,
}) => {
  // Вставка дефолтной или пользовательской иконки
  const iconVariant = icon || defaultIconVariants[variant];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      // Очистка таймера при размонтировании компонента или изменении `isOpen`
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <div
      id="Alert"
      className={`inline-flex space-x-2 transform-gpu transition-transform duration-500 ease-in-out items-center ${
        variantClasses[variant]
      } ${alignClasses[align]} ${
        isOpen ? "translate-y-0" : "translate-y-96"
      } fixed bottom-4 left-4 z-10 p-2`}
      role="alert"
    >
      {iconVariant && <div id="icon">{iconVariant}</div>}
      <div className="p-2 pr-8">
        {title && (
          <h3 className="font-semibold text-lg  text-neutral-50">{title}</h3>
        )}
        {subtitle && <p className=" text-neutral-50">{subtitle}</p>}
      </div>
      <button className="absolute right-2 top-2" onClick={onClose}>
        <CloseIcon className="text-neutral-50" />
      </button>
    </div>
  );
};

export default Alert;
