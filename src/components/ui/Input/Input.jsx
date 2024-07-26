// react
import { useState, useEffect } from "react";

// import classNames from "classnames";
import { cn } from "../../../utils/merge-styles";

/**
 * Компонент ввода текста.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.value - Текущее значение ввода (Обязательный).
 * @param {string} props.name - Уникальное имя элемента (Обязательный).
 * @param {string} props.label - Подпись элемента формы.
 * @param {string} props.error - Текст с ошибками при валидации.
 * @param {boolean} props.required - Поле ввода обязательно к заполнению.
 * @param {boolean} props.disabled - Поле доступно или нет для ввода.
 * @param {string} props.autoComplete - Разрешить автозаполнение для подставления данных при следующем входе.
 * @param {boolean} props.readOnly - Поле ввода для чтения или нет.
 * @param {string} props.placeholder - Текст-подсказка для ввода (Обязательный).
 * @param {string} props.type - Тип ввода (например, "text", "password" и т. д.).
 * @param {event: React.MouseEvent<HTMLInputElement>} props.onClick - Событие клика на вводе.
 * @param {event: React.ChangeEvent<HTMLInputElement>} props.onChange - Событие изменения значения ввода.
 * @param {event: React.InputEvent<HTMLInputElement>} props.onInput - Событие по окончании изменения значения элемента формы.
 * @param {event: React.FocusEvent<HTMLInputElement>} props.onBlur - Событие потери фокуса вводом.
 * @param {event: React.FocusEvent<HTMLInputElement>} props.onFocus - Событие получения фокуса вводом.
 * @param {string} props.className - Дополнительные классы для стилизации компонента.
 */
const Input = ({
  value,
  name,
  required,
  label,
  error,
  disabled,
  autoComplete = "off",
  readOnly,
  placeholder,
  type,
  onClick,
  onChange,
  onInput,
  onBlur,
  onFocus,
  className,
}) => {
  /* На крайний случай оставим пока */
  // const inputClasses = classNames(
  //   "w-full border border-neutral-400 p-2 focus:outline-none",
  //   disabled ? "opacity-50 cursor-not-allowed" : "",
  //   required && error ? "border-rose-500" : "",
  //   className || ""
  // );
  /* На крайний случай оставим пока */

  const inputClasses = cn(
    "w-full border border-neutral-400 p-2 focus:outline-none",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    required && error ? "border-red-400" : "",
    className || ""
  );

  // Состояние для скрытия/показа пропса required (обязательность заполнения поля)
  const [isUserTyping, setIsUserTyping] = useState(false);

  useEffect(() => {
    // Обновление состояния при изменении значения
    setIsUserTyping(value?.length > 0);
  }, [value]);

  /**
   * Обработчик события для поля ввода формы при изменении значения.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - Событие срабатывает при изменении поля формы.
   * @returns {void}
   */
  const handleChange = (event) => {
    onChange && onChange(event);
  };

  /**
   * Обработчик события для поля ввода формы по окончании изменения значения элемента.
   *
   * @param {React.FormEvent<HTMLInputElement>} event - Событие срабатывает по окончании изменения значения элемента формы.
   * @returns {void}
   */
  const handleInput = (event) => {
    onInput && onInput(event);
  };

  /**
   * Обработчик события получения фокуса вводом.
   *
   * @function
   * @param {React.FocusEvent<HTMLInputElement>} event - Событие получения фокуса.
   * @returns {void}
   */
  const handleFocus = (event) => {
    onFocus && onFocus(event);
  };

  /**
   * Обработчик события потери фокуса вводом.
   *
   * @function
   * @param {React.FocusEvent<HTMLInputElement>} event - Событие потери фокуса.
   * @returns {void}
   */
  const handleBlur = (event) => {
    onBlur && onBlur(event);
  };

  return (
    <div className="mb-4">
      <label className="block text-neutral-50" htmlFor={name}>
        {label}
        {required && !isUserTyping && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type || "text"}
        name={name}
        required={required}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        onClick={onClick}
        onChange={handleChange}
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={inputClasses}
      />
      {error && <span className="text-rose-400 text-sm">{error}</span>}
    </div>
  );
};

export default Input;
