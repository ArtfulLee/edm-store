// React
import { NavLink, useLocation } from "react-router-dom";

// Иконки
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

/** Массив пунктов меню */
const navItems = [
  { name: "Home", path: "/" },
  { name: "Favorites", path: "/favorites" },
];

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
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

  return (
    <>
      <header className="bg-neutral-900">
        <div className="container mx-auto flex gap-x-16 items-center p-4">
          <div className="edms-logo flex items-center space-x-2">
            <GraphicEqIcon className="text-neutral-50" />
            <div className="text-neutral-50 font-bold text-lg">EDM STORE</div>
          </div>
          <div className="flex text-neutral-50 space-x-8">
            {navItems?.map((item) => (
              <NavLink
                to={item?.path}
                key={item?.path}
                className={`${isActiveLink(item?.path) ? "text-emerald-400" : ""}`}
              >
                {item?.name}
              </NavLink>
            ))}
          </div>
          {/* Сюда надо будет добавить авторизацию. */}
        </div>
      </header>
    </>
  );
};

export default Header;
