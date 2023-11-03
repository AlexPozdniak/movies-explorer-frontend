import { Link, useLocation } from "react-router-dom";
import "./Navigation.scss";
import { MAIN_ROUT, MOVIES_ROUT, SAVE_MOVIES_ROUT } from "../../utils/constants";

export const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="navigation">
      <Link
        className={`navigation__link ${
          location.pathname !== MAIN_ROUT && "navigation__link_colored"
        } ${location.pathname === MOVIES_ROUT && "navigation__link_active"}`}
        to="/movies"
      >
        Фильмы
      </Link>
      <Link
        className={`navigation__link ${
          location.pathname !== MAIN_ROUT && "navigation__link_colored"
        } ${
          location.pathname === SAVE_MOVIES_ROUT && "navigation__link_active"
        }`}
        to={SAVE_MOVIES_ROUT}
      >
        Сохраненные фильмы
      </Link>
    </nav>
  );
};
