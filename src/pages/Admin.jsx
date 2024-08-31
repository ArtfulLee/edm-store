// react
import { useState, useEffect } from "react";

// hooks
import useForm from "../hooks/useForm";

//components
import AudioCards from "../components/ui/AudioCards/AudioCards";
import Alert from "../components/ui/Alert/Alert";
import { Drawer } from "../components/ui/Drawer/Drawer";

// store
import useMusicStore from "../store/useMusicStore";

// constants
import { ALERT__TEXTS } from "../constants/alertTexts";
import { AUDIO__TEXTS } from "../constants/texts";
import { NEW__AUDIO__PLACEHOLDERS } from "../constants/placeholders";

const Admin = () => {
  // Стейт для скрытия/показа компонента Drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Стейт для скрытия/показа компонента Alert
  const [alertData, setAlertData] = useState({
    title: "",
    subtitle: "",
    variant: "neutral",
    isOpen: false,
  });

  // Стейт для показа детальной информации по товару в Drawer
  const [selectedValue, setSelectedValue] = useState(null);

  // Стейт для переключения режима редактирования
  const [isEditing, setIsEditing] = useState(false);

  // Получаем CRUD операции.
  const {
    fetchMusicFromDB,
    addAudioFileInStore,
    editAudioFileOfStore,
    deleteAudioFileFromStore,
  } = useMusicStore();

  useEffect(() => {
    fetchMusicFromDB();
  }, [fetchMusicFromDB]);

  // Обработка данных формы.
  const { formValues, handleInput, resetForm } = useForm({
    artist: "",
    title: "",
    genre: "",
    audioSrc: "",
    imgSrc: "",
    label: "",
    price: "",
  });

  /**
   * Обработка отправки формы.
   * Если товар выбран, то редактируем его, иначе добавляем новый товар.
   * @param {Event} event - Событие отправки формы.
   * @returns {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedValue) {
      // Если товар выбран, редактируем его
      editAudioFileOfStore(selectedValue?.id, {
        artist: formValues?.artist || selectedValue?.artist,
        title: formValues?.title || selectedValue?.title,
        genre: formValues?.genre || selectedValue?.genre,
        audioSrc: formValues?.audioSrc || selectedValue?.audioSrc,
        imgSrc: formValues?.imgSrc || selectedValue?.imgSrc,
        label: formValues?.label || selectedValue?.label,
        price: formValues?.price || selectedValue?.price,
      });

      setAlertData({
        title: ALERT__TEXTS.editAudioFileOfStore.title,
        subtitle: ALERT__TEXTS.editAudioFileOfStore.subtitle,
        variant: "neutral",
        isOpen: true,
      });
    } else {
      // Если товар не выбран, добавляем новый товар
      addAudioFileInStore(formValues);
      setAlertData({
        title: ALERT__TEXTS.addAudioFileInStore.title,
        subtitle: ALERT__TEXTS.addAudioFileInStore.subtitle,
        variant: "neutral",
        isOpen: true,
      });
    }
    setDrawerOpen(false);
    resetForm();
  };

  /**
   * Обработчик события открытия сайдбара для добавления нового аудио файла.
   * @returns {void}
   */
  const handleAddAudioFile = () => {
    setSelectedValue(null);
    setIsEditing(true);
    setDrawerOpen(true);
  };

  /**
   * Обрабатывает редактирование товара.
   * @returns {void}
   */
  const handleEditItem = () => {
    setIsEditing(true);
  };

  /**
   * Обрабатывает удаление товара.
   * @returns {void}
   */
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteAudioFileFromStore(selectedValue?.id);
      setDrawerOpen(false);
      setSelectedValue(null);
      setIsEditing(false); // Сбрасываем режим редактирования
      setAlertData({
        title: ALERT__TEXTS.deleteAudioFileFromStore.title,
        subtitle: ALERT__TEXTS.deleteAudioFileFromStore.subtitle,
        variant: "neutral",
        isOpen: true,
      });
    }
  };

  /**
   * Обрабатывает двойной клик по строке таблицы.
   *
   * @param {Object} audioFile - Данные строки, по которой был выполнен двойной клик.
   * @returns {void}
   */
  const handleRowDoubleClick = (audioFile) => {
    setSelectedValue(audioFile);
    setDrawerOpen(true);
    setIsEditing(false); // Режим просмотра по умолчанию
  };

  /**
   * Закрывает компонент Drawer и очищает выбранное значение.
   *
   * @returns {void}
   */
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedValue(null);
    setIsEditing(false); // Сбрасываем режим редактирования
    resetForm();
  };

  return (
    <>
      <div className="container flex mx-auto my-4 space-x-16">
        <h2 className="text-2xl font-bold text-neutral-50">Audio data table</h2>
        <button
          type="button"
          onClick={handleAddAudioFile}
          className="border-2 border-emerald-400 bg-emerald-400 hover:border-emerald-300 hover:bg-emerald-300  text-neutral-900 font-semibold p-1 transition duration-100"
        >
          Add audio
        </button>
      </div>
      {/* Отображаем таблицу аудио файлов для редактирования. */}
      <AudioCards handleRowDoubleClick={handleRowDoubleClick} />

      {/* Сайдбар */}
      {isDrawerOpen && (
        <Drawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          title={
            selectedValue
              ? isEditing
                ? "Editing audio file"
                : "Viewing audio file"
              : "Adding audio file"
          }
        >
          <div className="w-full">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="artist">
                  {AUDIO__TEXTS.artist}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="artist"
                  type="text"
                  defaultValue={formValues?.artist || selectedValue?.artist}
                  onChange={handleInput}
                  placeholder={NEW__AUDIO__PLACEHOLDERS.artist}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="title">
                  {AUDIO__TEXTS.title}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="title"
                  type="text"
                  defaultValue={formValues?.title || selectedValue?.title}
                  onChange={handleInput}
                  placeholder={NEW__AUDIO__PLACEHOLDERS.title}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="genre">
                  {AUDIO__TEXTS.genre}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="genre"
                  type="text"
                  defaultValue={formValues?.genre || selectedValue?.genre}
                  onChange={handleInput}
                  placeholder={NEW__AUDIO__PLACEHOLDERS.genre}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="audioSrc">
                  {AUDIO__TEXTS.audioSrc}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="audioSrc"
                  type="text"
                  defaultValue={formValues?.audioSrc || selectedValue?.audioSrc}
                  onChange={handleInput}
                  placeholder={NEW__AUDIO__PLACEHOLDERS.audioSrc}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="imgSrc">
                  {AUDIO__TEXTS.imgSrc}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="imgSrc"
                  type="text"
                  defaultValue={formValues?.imgSrc || selectedValue?.imgSrc}
                  onChange={handleInput}
                  placeholder={NEW__AUDIO__PLACEHOLDERS.imgSrc}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="label">
                  {AUDIO__TEXTS.label}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="label"
                  type="text"
                  defaultValue={formValues?.label || selectedValue?.label}
                  onChange={handleInput}
                  placeholder={NEW__AUDIO__PLACEHOLDERS.label}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="price">
                  {AUDIO__TEXTS.price}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="price"
                  type="text"
                  defaultValue={formValues?.price || selectedValue?.price}
                  onChange={handleInput}
                  placeholder={NEW__AUDIO__PLACEHOLDERS.price}
                  readOnly={!isEditing}
                />
              </div>

              <div className="flex space-x-2 py-2">
                {!isEditing && selectedValue && (
                  <>
                    <button
                      className="w-full bg-yellow-400 text-neutral-900 font-semibold p-2"
                      onClick={handleEditItem}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full bg-red-400 text-neutral-900 font-semibold p-2"
                      onClick={handleDeleteItem}
                    >
                      Delete
                    </button>
                  </>
                )}
                {isEditing && (
                  <button className="w-full bg-emerald-400 text-neutral-900 font-semibold p-2">
                    Сохранить
                  </button>
                )}
              </div>
            </form>
          </div>
        </Drawer>
      )}

      {/* Alert */}
      <Alert
        title={alertData?.title}
        subtitle={alertData?.subtitle}
        variant={alertData?.variant}
        isOpen={alertData?.isOpen}
        onClose={() => {
          setAlertData((prevAlertData) => ({
            isOpen: !prevAlertData.isOpen,
          }));
        }}
      />
    </>
  );
};

export default Admin;
