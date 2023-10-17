import { Link, useLocation } from "react-router-dom";
import "./Navigation.scss";

export const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="navigation">
      <Link
        className={`navigation__link ${
          location.pathname !== "/" ? "navigation__link_colored" : ""
        } ${location.pathname === "/movies" ? "navigation__link_active" : ""}`}
        to="/movies"
      >
        Фильмы
      </Link>
      <Link
        className={`navigation__link ${
          location.pathname !== "/" ? "navigation__link_colored" : ""
        } ${
          location.pathname === "/saved-movies" ? "navigation__link_active" : ""
        }`}
        to="/saved-movies"
      >
        Сохраненные фильмы
      </Link>
    </nav>
  );
};
