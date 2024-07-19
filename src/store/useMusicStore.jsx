// Сторы
import { create } from "zustand";

// Утилиты
import { nanoid } from "nanoid";

/**
 * Музыкальное хранилище.
 * @type {Object} useMusicStore - Главный объект музыкального хранилища.
 * @prop {array} useMusicStore.musicOfStore - Массив музыкальных композиций.
 * @prop {function} useMusicStore.addMusicInStore - Функция добавляния нового аудио файла в массив музыкальных композиций.
 */
const useMusicStore = create((set) => ({
  musicOfStore: [
    {
      idOfTrack: "0",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/f0913793-b5f6-4b85-96a3-d18a9e56b654.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/1c43439b-1f4b-486d-bbcb-0bb338df77d7.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Bronx Posse",
      artist: "Skool Of Thought, Stanton Warriors",
      genre: "Breaks",
      label: "Against The Grain",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "1",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/6b9a02d4-709f-4074-87ba-03f5abcc4a09.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/0ec7afb9-9566-4ffd-a8e6-eed24d0b7880.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Get Ready",
      artist: "Aggresivnes",
      genre: "Breaks",
      label: "Elektroshok Records",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "2",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/655864c7-99b1-4430-8c02-4ed4da791c03.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/25f5e5fe-f607-4ca7-a13d-57d4ec697b0f.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Gold Dust",
      artist: "Krafty Kuts, DJ Fresh",
      genre: "Breaks",
      label: "Breakbeat Kaos",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "3",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/1dc8ea7e-5695-4023-9b10-802809ccf6e8.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/2bf869f3-cf90-4c03-bf44-323796a1c7e0.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Hot Like Fire",
      artist: "Ondamike",
      genre: "Breaks",
      label: "Ravesta Records",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "4",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/762ddf7a-520c-4321-81b8-1a8efe54c8b3.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/62b116ec-3682-4ab4-ac90-f68f774fe8f8.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Afrodisiac",
      artist: "Skool Of Thought, Stanton Warriors",
      genre: "Breaks",
      label: "Central Station Records",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "5",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/d3c871d9-ccf4-4998-89d1-ec876f382624.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/ffd60c53-2f99-414a-82d7-c01a9ddbd304.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Badman",
      artist: "Krafty Kuts",
      genre: "Breaks",
      label: "Against The Grain",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "6",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/48339034-bdd3-4a16-93c7-767979f8e390.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/3db6259b-d3ac-4cdf-871b-beb6131a4c2a.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Money Talks",
      artist: "FM-3",
      genre: "Breaks",
      label: "Banana Club",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "7",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/b7712e5e-7955-4391-a014-766d1ca98faf.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/5075e616-4cc6-407d-ad4f-d8d7ad3df3ac.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Evil Side",
      artist: "MIAU",
      genre: "Breaks",
      label: "Gigabeat Records",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "8",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/698f2f1d-1845-4381-92af-e20b1f3eb2aa.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/ca26687a-3c81-4714-8ab9-e93dd8ccef0b.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Obstacles",
      artist: "Basstyler, MIAU",
      genre: "Breaks",
      label: "SPACE PIZZA Records",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "9",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/677a6489-5945-4b57-ac31-a7a5250c3f8f.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/6f43c8a6-2937-47cc-a615-aa0153fafad1.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "No Coming Back",
      artist: "Keith Mackenzie",
      genre: "Breaks",
      label: "83",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "10",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/390ee8db-25cb-405b-86fc-db11f112335b.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/72956d93-8c30-4458-aaae-981cb51ddaa8.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Gym Workout",
      artist: "Obscene Frequenzy",
      genre: "Breaks",
      label: "Wasted",
      isFavorite: false,
      numberOfSales: 0,
    },
    {
      idOfTrack: "11",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/dd95a8f3-5a9c-40a1-a803-ef4036f2406a.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/34b9e340-86b0-4b20-9252-afb193e602db.LOFI.mp3",
      price: "3,25$",
      nameOfTrack: "Got A Feelin'",
      artist: "Keith Mackenzie, Miggy",
      genre: "Breaks",
      label: "Play Me Records",
      isFavorite: true,
      numberOfSales: 0,
    },
  ],

  /**
   * Добавление аудио файл в стор
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
   * Получение избранных аудио файлов.
   * @returns {Array} Массив избранных аудио файлов.
   */
  getFavoriteAudioFiles: () => (state) => {
    return state.musicOfStore?.filter((audioFile) => audioFile?.isFavorite);
  },

  /**
    Находит аудио файл по idOfTrack.
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
