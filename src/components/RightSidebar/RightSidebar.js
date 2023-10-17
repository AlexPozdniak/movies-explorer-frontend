import "./RightSidebar.scss";

import { Link } from "react-router-dom";

export const RightSidebar = () => {
  return (
    <nav className="right-sidebar">
      <Link className="right-sidebar__link" to="/movies">
        Фильмы
      </Link>
      <Link className="right-sidebar__link" to="/saved-movies">
        Сохраненные фильмы
      </Link>
    </nav>
  );
};
