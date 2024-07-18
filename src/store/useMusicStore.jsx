// Сторы
import { create } from "zustand";

// Утилиты
import { nanoid } from "nanoid";

/**
 * Музыкальное хранилище
 * @type {Object} useMusicStore - Главный объект музыкального хранилища
 * @prop {array} useMusicStore.allMusicOfStore - Массив музыкальных композиций
 * @prop {function} useMusicStore.addMusicInStore - Функция добавляния нового аудио файла в массив музыкальных композиций
 */
const useMusicStore = create(() => ({
  allMusicOfStore: [
    {
      idOfTrack: "0",
      imgSrc:
        "https://geo-media.beatport.com/image_size/1400x1400/f0913793-b5f6-4b85-96a3-d18a9e56b654.jpg",
      audioSrs:
        "https://geo-samples.beatport.com/track/1c43439b-1f4b-486d-bbcb-0bb338df77d7.LOFI.mp3",
      price: "3$",
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
      price: "3$",
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
      price: "3$",
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
      price: "3$",
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
      price: "3$",
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
      price: "3$",
      nameOfTrack: "Badman",
      artist: "Krafty Kuts",
      genre: "Breaks",
      label: "Against The Grain",
      isFavorite: false,
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
   * @returns {Array} - Обновленный массив объектов allMusicOfStore.
   */
  addMusicInStore:
    (imgSrc, audioSrs, price, nameOfTrack, artist, genre) => (state) => {
      const newTrackForStore = {
        idOfTrack: nanoid(),
        imgSrc,
        audioSrs,
        price,
        nameOfTrack,
        artist,
        genre,
        isFavorite: false,
        numberOfSales: 0,
      };

      return { allMusicOfStore: [...state.allMusicOfStore, newTrackForStore] };
    },
}));

export default useMusicStore;
