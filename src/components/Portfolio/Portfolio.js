import "./Portfolio.scss";

import { Link } from "react-router-dom";

import useMediaQueries from "../../hooks/useResize.js";

import vitaliy from "../../images/vitaliy.png";

export const Portfolio = () => {
  const { md, lg } = useMediaQueries();
  if (lg) {
    return (
      <section className="portfolio">
        <div className="portfolio__container">
          <h2 className="portfolio__title">Студент</h2>
          <div className="portfolio__wrapper">
            <div className="portfolio__information">
              <h3 className="portfolio__name">Виталий</h3>
              <h4 className="portfolio__subtitle">
                Фронтенд-разработчик, 30 лет
              </h4>
              <p className="portfolio__text">
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У
                меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
                бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
                Контур». После того, как прошёл курс по веб-разработке, начал
                заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
              <Link
                className="portfolio__link"
                to="https://github.com/AlexPozdniak/russian-travel"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </div>
            <img className="portfolio__image" src={vitaliy} alt="web" />
          </div>
          <div className="portfolio__links">
            <h3 className="portfolio__links-title">Портфолио</h3>
            <ul className="portfolio__link-list">
              <li>
                <Link
                  className="portfolio__link-to"
                  to="https://github.com/AlexPozdniak/second-project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Статичный сайт
                </Link>
              </li>
              <li>
                <Link
                  className="portfolio__img-link"
                  to="https://github.com/AlexPozdniak/first-project"
                  target="_blank"
                  rel="noopener noreferrer"
                ></Link>
              </li>
            </ul>
            <ul className="portfolio__link-list">
              <li>
                <Link
                  className="portfolio__link-to"
                  to="https://github.com/AlexPozdniak/russian-travel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Адаптивный сайт
                </Link>
              </li>
              <li>
                <Link
                  className="portfolio__img-link"
                  to="https://github.com/AlexPozdniak/second-project"
                  target="_blank"
                  rel="noopener noreferrer"
                ></Link>
              </li>
            </ul>
            <ul className="portfolio__link-list">
              <li>
                <Link
                  className="portfolio__link-to"
                  to="https://github.com/AlexPozdniak/first-project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Одностраничное приложение
                </Link>
              </li>
              <li>
                <Link
                  className="portfolio__img-link"
                  to="https://github.com/AlexPozdniak/russian-travel"
                  target="_blank"
                  rel="noopener noreferrer"
                ></Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Студент</h2>
        <div className="portfolio__wrapper">
          <img className="portfolio__image" src={vitaliy} alt="web" />
          <div className="portfolio__information">
            <h3 className="portfolio__name">Виталий</h3>
            <h4 className="portfolio__subtitle">
              Фронтенд-разработчик, 30 лет
            </h4>
            <p className="portfolio__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link
              className="portfolio__link"
              to="https://github.com/AlexPozdniak"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
        <div className="portfolio__links">
          <h3 className="portfolio__links-title">Портфолио</h3>
          <ul className="portfolio__link-list">
            <li>
              <Link
                className="portfolio__link-to"
                to="https://github.com/AlexPozdniak/second-project"
                target="_blank"
                rel="noopener noreferrer"
              >
                Статичный сайт
              </Link>
            </li>
            <li>
              <Link
                className="portfolio__img-link"
                to="https://github.com/AlexPozdniak/first-project"
                target="_blank"
                rel="noopener noreferrer"
              ></Link>
            </li>
          </ul>
          <ul className="portfolio__link-list">
            <li>
              <Link
                className="portfolio__link-to"
                to="https://github.com/AlexPozdniak/russian-travel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Адаптивный сайт
              </Link>
            </li>
            <li>
              <Link
                className="portfolio__img-link"
                to="https://github.com/AlexPozdniak/second-project"
                target="_blank"
                rel="noopener noreferrer"
              ></Link>
            </li>
          </ul>
          <ul className="portfolio__link-list">
            <li>
              <Link
                className="portfolio__link-to"
                to="https://github.com/AlexPozdniak/first-project"
                target="_blank"
                rel="noopener noreferrer"
              >
                Одностраничное приложение
              </Link>
            </li>
            <li>
              <Link
                className="portfolio__img-link"
                to="https://github.com/AlexPozdniak/russian-travel"
                target="_blank"
                rel="noopener noreferrer"
              ></Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
