import "./Register.scss";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import headerImg from "./../../images/logo.svg";
import { EMAIL_REG } from "../../utils/constants";

export const Register = ({ onRegister, isLoading, isLoggedIn }) => {
  const { values, handleChange, errors, isValid } = useForm({});
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  });

  return (
    <main className={`reg`}>
      <div className={`reg__container`}>
        <Link className="header__link" to="/">
          <img className="login__logo" src={headerImg} alt="Логотип" />
        </Link>
        <h1 className="reg__title">Добро пожаловать!</h1>
        <form className="reg__form" name={"form"} onSubmit={handleSubmit}>
          <fieldset className="reg__inputs">
            <label className="reg__subtitle">Имя</label>
            <input
              className={`reg__input`}
              name="name"
              type="text"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
            />
            <span className={`reg__input-error`}>{errors["name"]}</span>

            <label className="reg__subtitle">E-mail</label>
            <input
              className={`reg__input`}
              name="email"
              type="email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              pattern={EMAIL_REG}
            />
            <span className={`reg__input-error`}>{errors["email"]}</span>
            <label className="reg__subtitle">Пароль</label>
            <input
              className={`reg__input`}
              name="password"
              type="password"
              required
              minLength="2"
              maxLength="200"
              onChange={handleChange}
            />
            <span className={`reg__input-error`}>{errors["password"]}</span>
          </fieldset>
          <button
            className={`reg__submit ${!isValid && "reg__submit-btn_disabled"} ${isLoading && "reg__submit-btn_disabled"}`}
            type="submit"
            disabled={isLoading ? true : !isValid}
          >
            Зарегистрироваться
          </button>
          <p className="reg__question">
            Уже зарегистрированы?{" "}
            <Link className="reg__signin" to={"/signin"}>
              Войти
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};
