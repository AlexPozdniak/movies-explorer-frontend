import "./Login.scss";

import { Link } from "react-router-dom";
import { useState } from "react";

import headerImg from "./../../images/logo.svg";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmail = (e) => {
    setIsEmailValid(e.target.validity.valid);
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setIsPasswordValid(e.target.validity.valid);
    setPassword(e.target.value);
  }
  
  return (
    <main className={`login`}>
      <div className={`login__container`}>
        <Link className="login__link" to="/">
          <img className="login__img" src={headerImg} alt="Логотип" />
        </Link>

        <h1 className="login__main-title">Рады видеть!</h1>
        <form className="login__signin-form" name={"form"}>
          <fieldset className="login__inputs">
            <label className="login__lable">E-mail</label>
            <input
              className={`login__input ${
                !isEmailValid && "login__input_error-active"
              }`}
              name="email"
              type="email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleEmail}
              placeholder="E-mail"
              value={email || ""}
            />
            <span
              className={`login__input-error ${
                !isEmailValid && "login__input_error-active"
              }`}
            >
              Что-то пошло не так...
            </span>
            <label className="login__lable">Пароль</label>
            <input
              className={`login__input ${
                !isPasswordValid && "login__input_error-active"
              }`}
              name="password"
              type="password"
              required
              minLength="2"
              maxLength="200"
              onChange={handlePassword}
              placeholder="Пароль"
              value={password || ""}
            />
            <span
              className={`login__input-error ${
                !isPasswordValid && "login__input_error-active"
              }`}
            >
              Что-то пошло не так...
            </span>
          </fieldset>
          <button className={`login__submit-btn`} type="submit">
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
