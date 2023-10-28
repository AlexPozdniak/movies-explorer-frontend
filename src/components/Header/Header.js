import "./Header.scss";

import { Link, useLocation } from "react-router-dom";

import { Navigation } from "../Navigation/Navigation";

import useResize from "../../hooks/useResize";
import headerImg from "./../../images/logo.svg";
import accountImg from "./../../images/account.svg";

const Header = ({ isLoggedIn, onOpenBurger }) => {
  const large = useResize();
  const location = useLocation();
  if (large) {
    return (
      <header
        className={`header ${location.pathname !== "/" && "header_alter"}`}
      >
        <div className="header__container">
          <Link className="header__link" to="/">
            <img className="header__img" src={headerImg} alt="Логотип" />
          </Link>
          {isLoggedIn ? (
            <>
              <Navigation />
              <Link
                to="/profile"
                className={`header__account ${
                  location.pathname !== "/" && "header__account_alter"
                }`}
              >
                Аккаунт
                <div
                  className={`header__account-wrapper ${
                    location.pathname !== "/" && "header__account-wrapper_alter"
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
              <Link className="header__register" to="/signup">
                Регистрация
              </Link>
              <Link className="header__account-btn" to="/signin">
                <div className="header__login">Войти</div>
              </Link>
            </nav>
          )}
        </div>
      </header>
    );
  }
  return (
    <header className={`header ${location.pathname !== "/" && "header_alter"}`}>
      <div className="header__container">
        <Link className="header__link" to="/">
          <img className="header__img" src={headerImg} alt="Логотип" />
        </Link>
        {isLoggedIn ? (
          <>
            <button
              type="button"
              className={`header__burger-icon ${
                location.pathname === "/" && "header__burger-icon_white"
              }`}
              onClick={onOpenBurger}
            ></button>
          </>
        ) : (
          <div className="header__nav-menu">
            <Link className="header__register" to="/signup">
              Регистрация
            </Link>
            <Link className="header__account-btn" to="/signin">
              <div className="header__login">Войти</div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
