import "./Header.scss";

import { Link, useLocation } from "react-router-dom";

import { Navigation } from "../Navigation/Navigation";

import useResize from "../../hooks/useResize";
import headerImg from "./../../images/logo.svg";
import accountImg from "./../../images/account.svg";
import { MAIN_ROUT, PROFILE_ROUT, SIGN_IN_ROUT, SIGN_UP_ROUT } from "../../utils/constants";

const Header = ({ isLoggedIn, onOpenBurger }) => {
  const large = useResize();
  const location = useLocation();
  if (large) {
    return (
      <header
        className={`header ${location.pathname !== MAIN_ROUT && "header_alter"}`}
      >
        <div className="header__container">
          <Link className="header__link" to={MAIN_ROUT}>
            <img className="header__img" src={headerImg} alt="Логотип" />
          </Link>
          {isLoggedIn ? (
            <>
              <Navigation />
              <Link
                to={PROFILE_ROUT}
                className={`header__account ${
                  location.pathname !== MAIN_ROUT && "header__account_alter"
                }`}
              >
                Аккаунт
                <div
                  className={`header__account-wrapper ${
                    location.pathname !== MAIN_ROUT && "header__account-wrapper_alter"
                  }`}
                >
                  <img
                    className="header__account-img"
                    src={accountImg}
                    alt="лого"
                  />
                </div>
              </Link>
            </>
          ) : (
            <nav className="header__nav-menu">
              <Link className="header__register" to={SIGN_UP_ROUT}>
                Регистрация
              </Link>
              <Link className="header__account-btn" to={SIGN_IN_ROUT}>
                <div className="header__login">Войти</div>
              </Link>
            </nav>
          )}
        </div>
      </header>
    );
  }
  return (
    <header className={`header ${location.pathname !== MAIN_ROUT && "header_alter"}`}>
      <div className="header__container">
        <Link className="header__link" to={MAIN_ROUT}>
          <img className="header__img" src={headerImg} alt="Логотип" />
        </Link>
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className={`header__burger-icon ${
                location.pathname === MAIN_ROUT && "header__burger-icon_white"
              }`}
              onClick={onOpenBurger}
            ></button>
          </>
        ) : (
          <div className="header__nav-menu">
            <Link className="header__register" to={SIGN_UP_ROUT}>
              Регистрация
            </Link>
            <Link className="header__account-btn" to={SIGN_IN_ROUT}>
              <div className="header__login">Войти</div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
