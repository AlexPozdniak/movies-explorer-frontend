import { MOVIES_ROUT, SAVE_MOVIES_ROUT } from "../../utils/constants";
import "./RightSidebar.scss";

import { Link } from "react-router-dom";

export const RightSidebar = () => {
  return (
    <nav className="right-sidebar">
      <Link className="right-sidebar__link" to={MOVIES_ROUT}>
        Фильмы
      </Link>
      <Link className="right-sidebar__link" to={SAVE_MOVIES_ROUT}>
        Сохраненные фильмы
      </Link>
    </nav>
  );
};
