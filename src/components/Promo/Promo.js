import { Link } from "react-router-dom";
import "./Promo.scss";
import wordslogo from "../../images/main-image.svg";
import useMediaQueries from "../../hooks/useResize.js";
import { HashLink } from "react-router-hash-link";

export const Promo = () => {
  const large = useMediaQueries();

  if (large) {
    return (
      <section className="promo">
        <div className="promo__container">
          <div className="promo__info">
            <h1 className="promo__title">
              Учебный проект студента факультета{" "}
              <span className="promo__span">Веб-разработки.</span>
            </h1>
            <h2 className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </h2>
            <HashLink className="promo__link" smooth to="/#about">
              {" "}
              Узнать больше{" "}
            </HashLink>
          </div>
          <img className="promo__image" src={wordslogo} alt="Лого из слов" />
        </div>
      </section>
    );
  }
  return (
    <section className="promo">
      <div className="promo__container">
        <img className="promo__image" src={wordslogo} alt="Лого из слов" />
        <div className="promo__info">
          <h1 className="promo__title">
            Учебный проект студента факультета{" "}
            <span className="promo__span">Веб-разработки.</span>
          </h1>
          <h2 className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </h2>
          <HashLink className="promo__link" smooth to="/#about">
            {" "}
            Узнать больше{" "}
          </HashLink>
        </div>
      </div>
    </section>
  );
};
