import "./Login.scss";

import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { EMAIL_REG } from "../../utils/constants";

import headerImage from "./../../images/logo.svg";

export const Login = ({ onLogin, isLoading }) => {
  const { values, handleChange, errors, isValid } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onLogin(values);
    }
  }

  return (
    <main className={`login`}>
      <div className={`login__container`}>
        <Link className="login__link" to="/">
          <img className="login__img" src={headerImage} alt="Логотип" />
        </Link>
        <h1 className="login__main-title">Рады видеть!</h1>
        <form
          className="login__signin-form"
          name={"form"}
          onSubmit={handleSubmit}
        >
          <fieldset className="login__inputs">
            <label className="login__lable">E-mail</label>
            <input
              className={`login__input`}
              name="email"
              type="email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              pattern={EMAIL_REG}
            />
            <span className={`login__input-error`}>{errors["email"]}</span>
            <label className="login__lable">Пароль</label>
            <input
              className={`login__input`}
              name="password"
              type="password"
              required
              minLength="2"
              maxLength="200"
              onChange={handleChange}
            />
            <span className={`login__input-error`}>{errors["password"]}</span>
          </fieldset>
          <button
            className={`login__submit-btn ${
              !isValid && "login__submit-btn_disabled"
            }`}
            type="submit"
            disabled={isLoading ? true : !isValid}
          >
            Войти
          </button>
          <p className="login__text">
            Ещё не зарегистрированы?{" "}
            <Link className="login__reg-link" to={"/signup"}>
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
