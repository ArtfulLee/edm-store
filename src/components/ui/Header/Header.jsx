// React
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// components
import useForm from "../../../hooks/useForm";
import { useAuth } from "../../../hooks/useAuth";
import { Modal } from "../../Modal/Modal";
import Input from "../Input/Input";

// constants
import { PLACEHOLDERS } from "../../../constants/placeholders";

// icons
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

/** Массив пунктов меню */
const navItems = [
  { name: "Home", path: "/" },
  { name: "Favorites", path: "/favorites" },
  { name: "Admin", path: "/admin" },
];

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
  // Стейт для показа/скрытия модального окна регистрации.
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Стейт для показа/скрытия модального окна авторизации.
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Использование кастомного хука для обработки данных при авторизации.
  const { formValues, formErrors, handleInput, resetForm } = useForm({
    login: "",
    password: "",
  });

  const { user, onRegister, onLogin, onLogout } = useAuth();

  const location = useLocation();

  /*   const navigate = useNavigate();

  // Достаем функцию, которая показывает сохраненки
  const { getFavoriteProducts } = useProductStore();
  const favoritesCount = getFavoriteProducts()?.length;
  // Показ страницы с сохраненками
  const handleToOpenFavorites = () => {
    navigate(`/favorites`);
  }; */

  /**
   * Определяет, активна ли ссылка.
   * @param {string} path - Путь ссылки.
   * @returns {boolean} ссылка активна или нет.
   */
  const isActiveLink = (path) => {
    return (
      location?.pathname === path
      /*|| (path === "/cards" && location?.pathname?.startsWith("/cards")) */
    );
  };

  // Обработка формы при регистрации
  const handleRegisterForm = () => {
    onRegister(formValues);

    // Закрываем Modal
    setShowRegisterModal(false);

    // Сбрасываем форму
    resetForm();
  };

  // Обработка формы при входе в систему
  const handleLoginForm = () => {
    onLogin(formValues);

    // Закрываем Modal
    setShowLoginModal(false);

    // Сбрасываем форму
    resetForm();
  };

  // Обработчик закрытия модального окна (логин)
  const closeLoginModalAndResetForm = () => {
    setShowLoginModal(false);
    resetForm(); // Сбрасываем форму
  };

  // Обработчик закрытия модального окна (регистрация)
  const closeRegisterModalAndResetForm = () => {
    setShowRegisterModal(false);
    resetForm(); // Сбрасываем форму
  };

  return (
    <>
      <header className="bg-neutral-900">
        <div className="container mx-auto flex justify-between p-4">
          <div className="flex gap-x-16 items-center">
            <div className="edms-logo flex items-center space-x-2">
              <GraphicEqIcon className="text-neutral-50" />
              <div className="text-neutral-50 font-bold text-lg">EDM STORE</div>
            </div>

            <nav className="flex text-neutral-50 space-x-8">
              {navItems.map((item) => {
                // Скрыть пункт меню "Admin" если пользователь не администратор
                if (
                  item?.name === "Admin" &&
                  (!user || user?.role !== "admin")
                ) {
                  return null;
                }

                return (
                  <NavLink
                    to={item?.path}
                    key={item?.path}
                    className={`${
                      isActiveLink(item?.path) ? "text-emerald-400" : ""
                    } hover:text-emerald-400`}
                  >
                    {item?.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="flex gap-x-16 items-center">
            {/* <button
              type="button"
              onClick={handleToOpenFavorites}
              className={`relative bg-transparent p-1 mr-3 rounded-full text-gray-400 hover:text-gray-500   ${
                location?.pathname === "/favorites" ? "text-indigo-500" : ""
              }`}
            >
              <svg
                fill="currentColor"
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path d="M16,2a9,9,0,0,0-6,15.69V30l6-4,6,4V17.69A9,9,0,0,0,16,2Zm4,24.26-2.89-1.92L16,23.6l-1.11.74L12,26.26V19.05a8.88,8.88,0,0,0,8,0ZM20.89,16A7,7,0,1,1,23,11,7,7,0,0,1,20.89,16Z" />
                <rect className="fill-none" width="32" height="32" />
              </svg>

              {!!favoritesCount && (
                <span className="w-4 h-4 text-xs/6 px-1 leading-4 text-white inline-flex justify-center justify-items-center bg-indigo-500 rounded-3xl absolute top-0 right-0">
                  {favoritesCount}
                </span>
              )}
            </button> */}
            <button
              type="button"
              className="bg-transparent text-neutral-50  hover:text-emerald-400"
            >
              <ShoppingCartIcon />
            </button>

            {/* Start Authorization. */}
            <div id="buttons-wrapper" className="inline-flex items-center">
              {!user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="border-2 border-emerald-400 text-emerald-400 font-semibold p-1"
                  >
                    Sing In
                  </button>
                  <button
                    type="button"
                    className="border-2 border-emerald-400 bg-emerald-400 text-neutral-900 font-semibold p-1"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Sing Up
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="border-2 border-emerald-400 bg-emerald-400 text-neutral-900 font-semibold p-1"
                  onClick={onLogout}
                >
                  Logout
                </button>
              )}
            </div>
            {showRegisterModal && (
              <Modal
                title="Join EDM Store for free"
                isOpen={showRegisterModal}
                onClose={closeRegisterModalAndResetForm}
              >
                <form onSubmit={handleRegisterForm}>
                  <Input
                    label="firstName"
                    name="firstName"
                    type="text"
                    value={formValues?.firstName}
                    onInput={handleInput}
                    error={formErrors?.firstName}
                    placeholder={PLACEHOLDERS.firstName}
                    required
                  />
                  <Input
                    label="lastName"
                    name="lastName"
                    type="text"
                    value={formValues?.lastName}
                    onInput={handleInput}
                    error={formErrors?.lastName}
                    placeholder={PLACEHOLDERS.lastName}
                    required
                  />
                  <Input
                    label="login"
                    name="login"
                    type="text"
                    value={formValues?.login}
                    onInput={handleInput}
                    error={formErrors?.login}
                    placeholder={PLACEHOLDERS.login}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formValues?.email}
                    onInput={handleInput}
                    error={formErrors?.email}
                    placeholder={PLACEHOLDERS.email}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formValues?.password}
                    onInput={handleInput}
                    error={formErrors?.password}
                    placeholder={PLACEHOLDERS.password}
                    required
                  />

                  <button
                    className="bg-emerald-400 text-neutral-900 font-semibold p-2"
                    type="submit"
                  >
                    Sing Up
                  </button>
                </form>
              </Modal>
            )}
            {showLoginModal && (
              <Modal
                title="Welcome to EDM Store"
                isOpen={showLoginModal}
                onClose={closeLoginModalAndResetForm}
              >
                <form onSubmit={handleLoginForm}>
                  <Input
                    label="Login"
                    name="login"
                    type="text"
                    value={formValues?.login}
                    onInput={handleInput}
                    error={formErrors?.login}
                    placeholder={PLACEHOLDERS.login}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formValues?.password}
                    onInput={handleInput}
                    error={formErrors?.password}
                    placeholder={PLACEHOLDERS.password}
                    required
                  />

                  <button
                    className="bg-emerald-400 text-neutral-900 font-semibold p-2"
                    type="submit"
                  >
                    Sing in
                  </button>
                </form>
              </Modal>
            )}
            {/* End Authorization. */}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
