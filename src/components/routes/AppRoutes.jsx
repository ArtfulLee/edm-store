// react
import { Routes, Route } from "react-router-dom";

// routes
import PrivateRoute from "./PrivateRoute";

// components
import MainLayout from "../../layouts/MainLayout";
import Home from "../../pages/Home";
import Favorites from "../../pages/Favorites";
import Admin from "../../pages/Admin";

/** Массив роутов приложения. */
const routes = [
  { path: "/", element: <Home /> },
  { path: "favorites", element: <Favorites /> },
  {
    path: "admin",
    element: <PrivateRoute element={<Admin />} requiredRole="admin" />,
  },
];

/* Добавить страницу с карточкой аудио файла.
{ path: "audio-card/:id", element: <AudioCard /> }, */

/**
 * Рекурсивно отображает роуты и дочерние роуты.
 * @param {RouteItem[]} routes - Массив роутов.
 * @returns {JSX.Element[]} Массив JSX элементов роутов.
 */
const renderRoutes = (routes) => {
  return routes.map((route) => (
    <Route key={route?.path} path={route?.path} element={route?.element}>
      {route?.children && renderRoutes(route.children)}
    </Route>
  ));
};

/** Корневой компонент приложения с роутами. */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {renderRoutes(routes)}
    </Route>
  </Routes>
);

export default AppRoutes;
