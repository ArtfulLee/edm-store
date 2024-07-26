import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Компонент модального окна.
 * @param {Object} props - Свойства компонента.
 * @param {boolean} props.isOpen - Флаг, указывающий, открыто ли модальное окно.
 * @param {string} props.title - Заголовок модального окна.
 * @param {Function} props.onClose - Функция обратного вызова при закрытии модального окна.
 * @param {ReactNode} props.children - Дочерние элементы .модального окна.
 */
export const Modal = ({ isOpen, title, onClose, children }) => {
  /* Обработка закрытия модалки по клику на крестик. */
  const handleClose = () => onClose();

  // Создаем ссылку на DOM-элемент модального окна.
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Проверяем, был ли клик вне модального окна.
      if (modalRef?.current && !modalRef?.current?.contains(event?.target)) {
        // Закрываем модалку.
        onClose();
      }
    };

    // Обработчик нажатия клавиши Esc.
    const handleKeyPress = (event) => {
      if (event?.key === "Escape") onClose();
    };

    // Если модально окно открыто и код выполняется на клиенте.
    if (isOpen && typeof window !== "undefined") {
      // Добавляем слушатель события mousedown для закрытия модалки по клику вне.
      document.addEventListener("mousedown", handleOutsideClick);
      // Добавляем слушатель события keydown (нажатие клавиши Esc).
      document.addEventListener("keydown", handleKeyPress);
    }

    // Очищаем слушатель события при размонтировании компонента или при закрытии.
    return () => {
      // Если  модальное окно открыто и код выполняется на клиенте.
      if (isOpen && typeof window !== "undefined") {
        // Удаляем слушатель события mousedown для закрытия модалки по клику вне.
        document.removeEventListener("mousedown", handleOutsideClick);
        // Удаляем слушатель события keydown.
        document.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [isOpen, onClose]);

  return (
    isOpen &&
    createPortal(
      <div className="fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-neutral-950">
        <div
          ref={modalRef}
          className="modal border border-neutral-700 bg-neutral-800 m-4 shadow-md w-full md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12"
        >
          <header className="flex justify-between p-4 border-b border-neutral-700">
            {title && <h2 className="text-lg text-neutral-50 font-semibold">{title}</h2>}
            <button
              onClick={handleClose}
              className="text-neutral-50 hover:text-emerald-400"
            >
              <CloseIcon />
            </button>
          </header>
          <main className="modal-content px-4 pt-4">{children}</main>
          <footer className="flex justify-end px-4 pb-4"></footer>
        </div>
      </div>,
      document.body
    )
  );
};
