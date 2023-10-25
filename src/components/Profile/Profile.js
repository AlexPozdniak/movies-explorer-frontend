import "./Profile.scss";

import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { useForm } from "../../hooks/useForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export const Profile = ({ onLogout }) => {
  // const [nameError, setNameError] = useState(true);
  // const [name, setName] = useState("Виталий");
  // const [email, setEmail] = useState("pochta@yandex.ru");
  // const [emailError, setEmailError] = useState(true);

  const { values, handleChange, errors, isValid, clearForm } = useForm();
  const user = useContext(CurrentUserContext);
  console.log(user);
  // function handleName(e) {
  //   setNameError(e.target.validity.valid);
  //   setName(e.target.value);
  // }

  // function handleEmail(e) {
  //   setEmailError(e.target.validity.valid);
  //   setEmail(e.target.value);
  // }
  return (
    <main className={`profile`}>
      <section className={`profile__container`}>
        <h1 className="profile__title">Привет, !</h1>
        <form className="profile__form" name={"form"}>
          <fieldset className="profile__inputs">
            <div className="profile__inputs-container">
              <label className="profile__input-name">Имя</label>
              <input
                className={`profile__input ${
                  !isValid && "profile__input-error_active"
                }`}
                name="name"
                type="text"
                required
                minLength="2"
                maxLength="200"
                onChange={handleChange}
                value={'' ||  ""}
              />
            </div>
            <div className="profile__inputs-container">
              <label className="profile__input-name">E-mail</label>
              <input
                className={`profile__input ${
                  !isValid && "profile__input-error_active"
                }`}
                name="email"
                type="email"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={'' ||  ""}
                pattern="[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}"
              />
            </div>
          </fieldset>
          <div className="profile__buttons">
            <button className={`profile__submit`} type="button">
              Редактировать
            </button>
            <Link className="profile__exit" to={"/"} onClick={() => onLogout()}>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};
