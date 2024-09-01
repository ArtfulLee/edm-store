// react
import { useState } from "react";

// stores
import useUsersStore from "../store/useUsersStore";

// components
import Alert from "../components/ui/Alert/Alert";
import AudioCards from "../components/ui/AudioCards/AudioCards";

// constants
import { ALERT__TEXTS } from "../constants/alertTexts";

/**
 * Компонент корзина
 * @returns
 */
const Cart = () => {
  // Получение данных из стора (корзина товаров)
  const { deleteAudioFromCart } = useUsersStore((state) => ({
    audioFromCart: state.audioFromCart,
    getAudioFromCart: state.getAudioFromCart,
    deleteAudioFromCart: state.deleteAudioFromCart,
  }));

  /**
   * Стейт для отслеживания изменений текущего пользователя.
   */
  const [currentUserState, setCurrentUserState] = useState(null);

  /**
   * Обработчик для удаления товара из корзины
   * @param {string} audioId - id товара, который нужно удалить.
   */
  const handleDeleteAudioFromCart = (audioId) => {
    deleteAudioFromCart(audioId);
    setAlertState({
      isOpen: true,
      title: ALERT__TEXTS.deleteAudioFileFromCart.title,
      subtitle: ALERT__TEXTS.deleteAudioFileFromCart.subtitle,
    });
  };

  /**
   * Обработчик покупки
   */
  const hanleCheckout = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    currentUser.boughtAudioFiles = [
      ...currentUser.boughtAudioFiles,
      ...currentUser.audioFromCart,
    ];

    currentUser.audioFromCart = [];

    setCurrentUserState(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  };

  // Стейт для показа/скрытия и передачи сообщения в Alert
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
  });

  return (
    <>
      <div className="container mx-auto my-4">
        <h2 className="text-2xl font-bold text-neutral-50">My cart</h2>
      </div>
      <AudioCards handleDeleteAudioFromCart={handleDeleteAudioFromCart} />
      <div className="w-full flex justify-end py-2">
        <button
          type="button"
          onClick={hanleCheckout}
          className="border-2 border-emerald-400 bg-emerald-400 hover:border-emerald-300 hover:bg-emerald-300  text-neutral-900 font-semibold p-1 transition duration-100"
        >
          Checkout
        </button>
      </div>

      <Alert
        title={alertState?.title}
        subtitle={alertState?.subtitle}
        variant="neutral"
        isOpen={alertState?.isOpen}
        onClose={() => setAlertState(!alertState?.isOpen)}
      />
    </>
  );
};

export default Cart;
