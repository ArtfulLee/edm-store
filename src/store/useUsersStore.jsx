// constants
import { SERVER__CONSTANTS } from "../../server/serverConstants";
import { ERROR__TEXTS } from "../constants/errorTexts";

// Сторы
import { create } from "zustand";

/**
 * Музыкальное хранилище.
 * @type {Object} useUsersStore - Главный объект хранилища пользователей.
 * @prop {array} useUsersStore.users - Массив пользователей.
 * @prop {string} useUsersStore.error - текст ошибки запроса.
 * @prop {function} useUsersStore.fetchUsersFromDB - запрос на получение пользователей с сервера db.json.
 * @prop {function} useUsersStore.onToggleFavorite - Переключение состояния isFavorite по id карточки аудио файла.
 * @prop {function} useUsersStore.getFavoriteAudioFiles - Функция для получения избранных аудио файлов пользователя.
 */
const useUsersStore = create((set, get) => ({
  users: [],
  error: null,

  /**
   * Получение пользователей сайта
   */
  fetchUsersFromDB: async () => {
    try {
      const response = await fetch(
        `${SERVER__CONSTANTS.server}${SERVER__CONSTANTS.users}`
      );

      if (!response.ok)
        throw new Error(
          `${ERROR__TEXTS.errorFetch} ${SERVER__CONSTANTS.server.users}`
        );

      set({
        users: await response.json(),
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
    }
  },

  onToggleFavorite: async (audioDetails) => {
    try {
      // Список всех пользователей
      const currentUsers = get().users;

      // Текущий пользователь
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (currentUser.favoritesAudio.includes(audioDetails.id)) {
        currentUser.favoritesAudio = currentUser.favoritesAudio.filter(
          (audioId) => audioId !== audioDetails.id
        );
      } else {
        currentUser.favoritesAudio.push(audioDetails.id);
      }

      localStorage.setItem("user", JSON.stringify(currentUser));

      // Для отладки
      console.log("currentUsers", currentUsers);
      console.log("currentUser", currentUser);
    } catch (error) {
      console.log("catch", audioDetails);
    }
  },
}));

export default useUsersStore;
