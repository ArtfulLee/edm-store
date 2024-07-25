// constants
import { SERVER_CONSTANTS } from "../../server/serverConstants";
import { ERROR_TEXTS } from "../constants/errorTexts";

// Сторы
import { create } from "zustand";

// Утилиты
import { nanoid } from "nanoid";

/**
 * Музыкальное хранилище.
 * @type {Object} useMusicStore - Главный объект музыкального хранилища.
 * @prop {array} useMusicStore.musicOfStore - Массив музыкальных композиций.
 * @prop {string} useMusicStore.error - текст ошибки запроса.
 * @prop {function} useMusicStore.fetchMusicFromDB - запрос на получение аудио файлов для "useMusicStore.musicOfStore" с сервера db.json.
 * @prop {function} useMusicStore.addMusicInStore - Функция добавляния нового аудио файла в музыкальных композиций на сервер db.json.
 * @prop {function} useMusicStore.onToggleFavorite - Переключение состояния isFavorite по idOfTrack карточки аудио файла.
 * @prop {function} useMusicStore.getFavoriteAudioFiles - Функция для получения избранных аудио файлов пользователя.
 * @prop {function} useMusicStore.getAudioFileByIdOfTrack - Функция для получения аудио файла по idOfTrack.
 */
const useMusicStore = create((set) => ({
  musicOfStore: [],
  error: null,

  fetchMusicFromDB: async () => {
    try {
      const response = await fetch(
        `${SERVER_CONSTANTS.server}${SERVER_CONSTANTS.musicOfStore}`
      );

      console.log(response);
      if (!response.ok)
        throw new Error(
          `${ERROR_TEXTS.errorFetch} ${SERVER_CONSTANTS.server.musicOfStore}`
        );

      set({
        musicOfStore: await response.json(),
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
    }
  },

  /**
   * Функция добавляния нового аудио файла в музыкальных композиций на сервер db.json.
   * @param {string} imgSrc - Путь к изображению.
   * @param {string} audioSrs - Путь к аудио файлу.
   * @param {string} price - Цена аудио файла.
   * @param {string} nameOfTrack - Название композиции.
   * @param {string} artist - Имена артистов.
   * @param {string} genre - Жанр.
   * @param {string} label - Лейбл.
   * @returns {Array} - Обновленный массив объектов musicOfStore.
   */
  addMusicInStore: (
    imgSrc,
    audioSrs,
    price,
    nameOfTrack,
    artist,
    genre,
    label
  ) =>
    set((state) => {
      const newTrackForStore = {
        idOfTrack: nanoid(),
        imgSrc,
        audioSrs,
        price,
        nameOfTrack,
        artist,
        genre,
        label,
        isFavorite: false,
        numberOfSales: 0,
      };

      return { musicOfStore: [...state.musicOfStore, newTrackForStore] };
    }),

  /**
   * Переключение состояния isFavorite по idOfTrack карточки аудио файла.
   * @param {object} audioDetails - Детали карточки.
   * @param {string} audioDetails.idOfTrack - Идентификатор карточки.
   * @param {string} audioDetails.imgSrc - Путь к изображению.
   * @param {string} audioDetails.audioSrs - Путь к аудио файлу.
   * @param {string} audioDetails.price - Цена аудио файла.
   * @param {string} audioDetails.nameOfTrack - Название композиции.
   * @param {string} audioDetails.artist - Имена артистов.
   * @param {string} audioDetails.genre - Жанр. (WIP)
   * @param {string} audioDetails.isFavorite - Добавлено в избранные или нет. (WIP)
   * @param {string} audioDetails.numberOfSales - Количество продаж (WIP)
   * @returns
   */
  onToggleFavorite: (audioDetails) =>
    set((state) => {
      // Обновляем стор с корректным значением isFavorite у аудиофайлов.
      const updateMusicOfStore = state.musicOfStore.map((audioFile) => {
        if (audioFile.idOfTrack === audioDetails.idOfTrack) {
          audioFile.isFavorite = !audioFile.isFavorite;
        }
        return audioFile;
      });

      // Обновляем local storage актуальными избранными аудио файлами.
      const updatedFavoriteAudioFiles = updateMusicOfStore
        ?.filter((audioFile) => audioFile?.isFavorite)
        ?.map((audioFile) => audioFile?.idOfTrack);

      localStorage.setItem(
        "favoriteAudioFiles",
        JSON.stringify(updatedFavoriteAudioFiles)
      );

      return { musicOfStore: updateMusicOfStore };
    }),

  /**
   * Функция для получения избранных аудио файлов пользователя.
   * @returns {Array} Массив избранных аудио файлов.
   */
  getFavoriteAudioFiles: () => (state) => {
    return state.musicOfStore?.filter((audioFile) => audioFile?.isFavorite);
  },

  /**
    Функция для получения аудио файла по idOfTrack.
    @param {string} idOfTrack - id аудио файла.
    @returns {Object|null} Возвращает найденный продукт или null.
    */
  getAudioFileByIdOfTrack: (idOfTrack) => (state) => {
    state.musicOfStore.find((audioFile) => {
      return audioFile.idOfTrack === idOfTrack || null;
    });
  },
}));

export default useMusicStore;
