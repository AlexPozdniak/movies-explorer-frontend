import './InfoPopup.scss';

import { SUCCESS_MSG, ERROR_MSG } from '../../utils/constants';

import success from "../../images/success.svg";
import error from "../../images/error.svg";

function InfoPopup({ isOpen, onClose, isSuccessful }) {
  const message = isSuccessful
    ? SUCCESS_MSG
    : ERROR_MSG;

  function handleClose() {
    onClose((prev) => !prev);
  }

  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img
          className="popup__info-img"
          src={isSuccessful ? success : error}
          alt={message}
        />
        <h2 className="popup__info-text">{message}</h2>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={handleClose}
        />
      </div>
    </section>
  );
}

export default InfoPopup;
