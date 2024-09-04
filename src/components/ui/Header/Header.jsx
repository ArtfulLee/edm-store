// React
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

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
  { name: "Downloads", path: "/downloads" },
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
              <h1 className="text-neutral-50 font-bold text-lg">EDM STORE</h1>
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

                // Скрыть пункт меню "Favorites" и "Downloads" если пользователь не авторизован
                if (
                  (item?.name === "Favorites" || item?.name === "Downloads") &&
                  !user
                ) {
                  return null;
                }

                return (
                  <NavLink
                    to={item?.path}
                    key={item?.path}
                    className={`${
                      isActiveLink(item?.path) ? "text-emerald-400" : ""
                    } hover:text-emerald-300 transition duration-100`}
                  >
                    {item?.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="flex gap-x-16 items-center">
            <NavLink to="/cart" key="/cart">
              <button
                type="button"
                className={`${
                  isActiveLink("/cart")
                    ? "text-emerald-400"
                    : "text-neutral-50  "
                } relative hover:text-emerald-300 transition duration-100`}
              >
                <ShoppingCartIcon />
                {/* {!!favoritesCount && (
                  <span className="w-4 h-4 text-xs/6 px-1 leading-4 text-white inline-flex justify-center justify-items-center bg-indigo-500 rounded-3xl absolute top-0 right-0">
                    {favoritesCount}
                  </span>
                )} */}
              </button>
            </NavLink>

            {/* Start Authorization. */}
            <div
              id="buttons-wrapper"
              className="inline-flex items-center space-x-2"
            >
              {!user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="border-2 border-emerald-400 text-emerald-400 hover:border-emerald-300 hover:text-emerald-300 font-semibold p-1 transition duration-100"
                  >
                    Sing In
                  </button>
                  <button
                    type="button"
                    className="border-2 border-emerald-400 bg-emerald-400 hover:border-emerald-300 hover:bg-emerald-300 text-neutral-900 font-semibold p-1 transition duration-100"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Sing Up
                  </button>
                </>
              ) : (
                <Link to="/">
                  <button
                    type="button"
                    className="border-2 border-emerald-400 bg-emerald-400 hover:border-emerald-300 hover:bg-emerald-300 text-neutral-900 font-semibold p-1 transition duration-100"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </Link>
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
                    className="bg-emerald-400 hover:bg-emerald-300 text-neutral-900 font-semibold p-2"
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
                    className="bg-emerald-400 hover:bg-emerald-300 text-neutral-900 font-semibold p-2"
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
