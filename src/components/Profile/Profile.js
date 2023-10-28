import "./Profile.scss";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { useForm } from "../../hooks/useForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { EMAIL_REG } from "../../utils/constants";

export const Profile = ({ onLogout, onUpdateUser, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useForm({
    name: user.name,
    email: user.email,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  console.log(values);
  console.log(errors);

  console.log(user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);
  function handleSubmit(e) {
    e.preventDefault();
    const name = values.name || user.name;
    const email = values.email || user.email;
    onUpdateUser({ name, email });
    console.log({ name: values.name, email: values.email });
    setIsEditing(false);
  }

  useEffect(() => {
    if (
      values.name &&
      values.email &&
      (user.name !== values.name || user.email !== values.email)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [values, user]);

  return (
    <main className={`profile`}>
      <section className={`profile__container`}>
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <form className="profile__form" name={"form"} onSubmit={handleSubmit}>
          <fieldset className="profile__inputs">
            <div className="profile__inputs-container">
              <label className="profile__input-name">Имя</label>
              <input
                className={`profile__input ${
                  !isValid &&
                  values["name"] &&
                  isEditing &&
                  "profile__input-error_active"
                }`}
                name="name"
                type="text"
                required
                minLength="2"
                maxLength="20"
                onChange={handleChange}
                value={isEditing ? values["name"] : name}
                disabled={!isEditing}
              />
            </div>
            <div className="profile__inputs-container">
              <label className="profile__input-name">E-mail</label>
              <input
                className={`profile__input ${
                  !isValid &&
                  values["email"] &&
                  isEditing &&
                  "profile__input-error_active"
                }`}
                name="email"
                type="email"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={isEditing ? values["email"] : email}
                pattern={EMAIL_REG}
                disabled={!isEditing}
              />
            </div>
          </fieldset>
          <div className="profile__buttons">
            {isEditing && (
              <>
                <button
                  className={`profile__submit ${
                    !isValid || isDisabled ? "profile__submit_disabled" : ""
                  }`}
                  type="submit"
                  disabled={isLoading ? true : !isValid || isDisabled}
                >
                  Сохранить
                </button>
                <span className="profile__input-error profile__input-error_active-bottom">
                  {errors.name}
                </span>
                <span className="profile__input-error profile__input-error_active-bottom">
                  {errors.email}
                </span>
              </>
            )}
            {!isEditing && (
              <button
                className={`profile__submit`}
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                Редактировать
              </button>
            )}
            <Link className="profile__exit" to={"/"} onClick={() => onLogout()}>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};
