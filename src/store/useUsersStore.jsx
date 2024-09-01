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
const useUsersStore = create((set) => ({
  users: [],
  error: null,
  audioFromCart: [],
  boughtAudioFiles: [],

  /**
   * Получение пользователей сайта.
   * Пока не понятно, зачем я это сделал, но пусть будет.
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

  /**
   * Добавление/удаление аудио файла пользоватля для свойства пользователя favoritesAudio
   * @param {object} audioDetails - Аудио файл
   */
  onToggleFavorite: async (audioDetails) => {
    try {
      // Текущий пользователь
      const currentUser = JSON.parse(localStorage.getItem("user"));

      // Если у пользователя аудио файл был помечен как избранный, то удаляем аудио файл по идентификатору из массива избранных аудио файлов.
      if (currentUser.favoritesAudio.includes(audioDetails.id)) {
        currentUser.favoritesAudio = currentUser.favoritesAudio.filter(
          (audioId) => audioId !== audioDetails.id
        );
      } else {
        // Иначе, добавляем идентификатор аудио файла в избранные аудио файлы пользователя.
        currentUser.favoritesAudio.push(audioDetails.id);
      }

      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (error) {
      console.log("catch", audioDetails);
    }
  },

  /**
   * Функция получения купленных аудио файлов пользователя
   */
  getBoughtAudioFiles: async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    set({ boughtAudioFiles: [currentUser.boughtAudioFiles] });
  },

  /**
   * Функция получения массива id аудио файлов из корзины пользователя.
   */
  getAudioFromCart: async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    set({ audioFromCart: [currentUser.audioFromCart] });
  },

  /**
   * Функция удаления аудио файла из корзины товаров по id.
   * @param {string} idFromCart - идентификатор аудио файла для удаления из корзины.
   */
  deleteAudioFromCart: async (idFromCart) => {
    // Получаем пользвоателя из localStorage.
    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Обновляем массив идентификаторов товаров с учетом удаляемого ид.
    currentUser.audioFromCart = currentUser.audioFromCart.filter((id) => {
      if (idFromCart !== id) return id;
    });

    // Обновляем пользователя с localStorage.
    localStorage.setItem("user", JSON.stringify(currentUser));

    // Сеттим новый массив аудио файлов из корзины в стор пользователя.
    set({ audioFromCart: [currentUser.audioFromCart] });
  },

  /**
   * Функция добавления id аудио файла в корзину пользователя.
   * @param {string} idToCart - идентификатор аудио файла для добавления в корзину.
   */
  addAudioToCart: async (idToCart) => {
    // Получаем пользвоателя из localStorage.
    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Если пользователь еще не покупал аудио файл по idToCart...
    if (!currentUser.boughtAudioFiles.includes(idToCart)) {
      // И если пользователь еще не добавил аудио файл в корзину, то добавляем в корзину и обновляем audioFromCart стора.
      if (!currentUser.audioFromCart.includes(idToCart)) {
        // Добавляем идентификатор карточки в корзину пользователя.
        currentUser.audioFromCart.push(idToCart);

        // Обновляем пользователя в localStorage.
        localStorage.setItem("user", JSON.stringify(currentUser));

        // Сеттим новый массив аудио файлов из корзины в стор пользователя.
        set({ audioFromCart: [currentUser.audioFromCart] });
      }
    }
  },
}));

export default useUsersStore;
