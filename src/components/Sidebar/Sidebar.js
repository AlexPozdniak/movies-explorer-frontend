import "./Sidebar.scss";

import { Link } from "react-router-dom";

import { RightSidebar } from "../RightSidebar/RightSidebar";

import accountImg from "./../../images/account.svg";
import { MAIN_ROUT, PROFILE_ROUT } from "../../utils/constants";

export const Sidebar = ({ closeMenu }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__menu">
        <button
          type="button"
          className="sidebar__exit"
          onClick={() => closeMenu(false)}
        ></button>
        <Link to={MAIN_ROUT} className="sidebar__title">
          Главная
        </Link>
        <RightSidebar />
        <Link to={PROFILE_ROUT} className="sidebar__account">
          Аккаунт
          <div className="sidebar__wrapper">
            <img className="sidebar__logo" src={accountImg} alt="Логотип" />
          </div>
        </Link>
      </div>
    </div>
  );
};
