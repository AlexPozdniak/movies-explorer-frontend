import { AUTHOR_GITHUB_LINK, PRACTICUM_LINK } from "../../utils/constants";
import "./Footer.scss";

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__description">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__text">
          <p className="footer__copyright">© 2023</p>
          <div className="footer__links">
            <Link
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              to={PRACTICUM_LINK}
            >
              Яндекс.Практикум
            </Link>
            <Link
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              to={AUTHOR_GITHUB_LINK}
            >
              Github
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
