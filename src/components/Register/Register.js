import "./Register.scss";

import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";

import headerImg from "./../../images/logo.svg";

export const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onRegister(values);
    }
  }

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
            <span
              className={`reg__input-error`}
            >
              {errors["name"]}
            </span>

            <label className="reg__subtitle">E-mail</label>
            <input
              className={`reg__input`}
              name="email"
              type="email"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
              pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
            />
            <span
              className={`reg__input-error`}
            >
              {errors["email"]}
            </span>
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
            <span
              className={`reg__input-error`}
            >
              {errors["password"]}
            </span>
          </fieldset>
          <button className={`reg__submit`} type="submit" disabled={!isValid}>
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
