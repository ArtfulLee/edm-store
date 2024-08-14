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

  // Стор для CRUD операций.
  const { fetchMusicFromDB, addMusicInStore, editItem, deleteItem } =
    useMusicStore();

  useEffect(() => {
    fetchMusicFromDB();
  }, [fetchMusicFromDB]);

  // Обработка данных формы.
  const { formValues, handleInput, resetForm } = useForm({
    name: "",
    category: "",
    price: "",
  });

  /**
   * Обработка отправки формы.
   * Если товар выбран, то редактируем его, иначе добавляем новый товар.
   *
   * @param {Event} event - Событие отправки формы.
   * @returns {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedValue) {
      // Если товар выбран, редактируем его
      editItem(selectedValue?.id, formValues);

      setAlertData({
        title: ALERT__TEXTS.editItem.title,
        subtitle: ALERT__TEXTS.editItem.subtitle,
        variant: "neutral",
        isOpen: true,
      });
    } else {
      // Если товар не выбран, добавляем новый товар
      addMusicInStore(formValues);
      setAlertData({
        title: ALERT__TEXTS.addItem.title,
        subtitle: ALERT__TEXTS.addItem.subtitle,
        variant: "neutral",
        isOpen: true,
      });
    }
    setDrawerOpen(false);
    resetForm();
  };

  /**
   * Обрабатывает редактирование товара.
   *
   * @returns {void}
   */
  const handleEditItem = () => {
    setIsEditing(true);
  };

  /**
   * Обрабатывает удаление товара.
   *
   * @returns {void}
   */
  const handleDeleteItem = () => {
    if (selectedValue) {
      deleteItem(selectedValue?.id);
      setDrawerOpen(false);
      setSelectedValue(null);
      setIsEditing(false); // Сбрасываем режим редактирования
      setAlertData({
        title: ALERT__TEXTS.deleteItem.title,
        subtitle: ALERT__TEXTS.deleteItem.subtitle,
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
      <div className="container mx-auto my-4">
        <h1 className="text-2xl font-bold text-neutral-50">Audio data table</h1>
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
                ? "Редактирование товара"
                : "Чтение данных по товару"
              : "Добавление нового товара"
          }
        >
          <div className="w-full max-w-xs">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="name">
                  {AUDIO__TEXTS.artist}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="name"
                  type="text"
                  defaultValue={formValues?.name || selectedValue?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="name">
                  {AUDIO__TEXTS.title}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="name"
                  type="text"
                  defaultValue={formValues?.name || selectedValue?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="name">
                  {AUDIO__TEXTS.genre}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="name"
                  type="text"
                  defaultValue={formValues?.name || selectedValue?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="name">
                  {AUDIO__TEXTS.audioSrc}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="name"
                  type="text"
                  defaultValue={formValues?.name || selectedValue?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="name">
                  {AUDIO__TEXTS.imgSrc}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="name"
                  type="text"
                  defaultValue={formValues?.name || selectedValue?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="name">
                  {AUDIO__TEXTS.label}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="name"
                  type="text"
                  defaultValue={formValues?.name || selectedValue?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-neutral-50" htmlFor="name">
                  {AUDIO__TEXTS.price}
                </label>
                <input
                  className="read-only:bg-gray-200 read-only:cursor-not-allowed read-only:opacity-50 appearance-none w-full border border-neutral-400 p-2 text-neutral-900 focus:outline-none"
                  name="name"
                  type="text"
                  defaultValue={formValues?.name || selectedValue?.name}
                  onChange={handleInput}
                  placeholder="Введите название"
                  readOnly={!isEditing}
                />
              </div>

              <div className="flex gap-4">
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
