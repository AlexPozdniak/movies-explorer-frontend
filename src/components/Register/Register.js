import "./Register.scss";

import { useState } from "react";
import { Link } from "react-router-dom";

import headerImg from "./../../images/logo.svg";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState(true);
  const [emailErr, setEmailErr] = useState(true);
  const [passwordErr, setPasswordErr] = useState(true);

  const handlePassword = (e) => {
    setPasswordErr(e.target.validity.valid);
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmailErr(e.target.validity.valid);
    setEmail(e.target.value);
  };
  const handleName = (e) => {
    setNameErr(e.target.validity.valid);
    setName(e.target.value);
  };

  return (
    <main className={`reg`}>
      <div className={`reg__container`}>
        <Link className="header__link" to="/">
          <img className="login__logo" src={headerImg} alt="Логотип" />
        </Link>
        <h1 className="reg__title">Добро пожаловать!</h1>
        <form className="reg__form" name={"form"}>
          <fieldset className="reg__inputs">
            <label className="reg__subtitle">Имя</label>
            <input
              className={`reg__input ${!nameErr && "reg__input-error_active"}`}
              name="name"
              type="text"
              required
              minLength="2"
              maxLength="40"
              onChange={handleName}
              placeholder="Имя"
              value={name || ""}
            />
            <span
              className={`reg__input-error ${
                !nameErr && "reg__input-error_active"
              }`}
            >
              Что-то пошло не так...
            </span>

            <label className="reg__subtitle">E-mail</label>
            <input
              className={`reg__input ${!emailErr && "reg__input-error_active"}`}
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
              className={`reg__input-error ${
                !email && "reg__input-error_active"
              }`}
            >
              Что-то пошло не так...
            </span>
            <label className="reg__subtitle">Пароль</label>
            <input
              className={`reg__input ${
                !passwordErr && "reg__input-error_active"
              }`}
              name="password"
              type="password"
              required
              minLength="2"
              maxLength="200"
              placeholder="Пароль"
              onChange={handlePassword}
              value={password || ""}
            />
            <span
              className={`reg__input-error ${
                !password && "reg__input-error_active"
              }`}
            >
              Что-то пошло не так...
            </span>
          </fieldset>
          <button className={`reg__submit`} type="submit">
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
