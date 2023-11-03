import { MOVIES_ROUT, SAVE_MOVIES_ROUT, WRONG_FORMAT_ERROR_MSG } from "../../utils/constants";
import "./MoviesCard.scss";

import { useLocation } from "react-router-dom";

export const MoviesCard = ({
  url,
  title,
  duration,
  isLiked,
  onLike,
  onDislike,
  movie,
  _id,
}) => {
  const location = useLocation();
  const handleLikeClick = () => {
    if (isLiked) {
      if (location.pathname === MOVIES_ROUT) {
        onDislike({ _id });
      } else {
        movie.movieId = movie.id;
        onDislike(movie);
      }
    } else {
      onLike(movie);
    }
  };
  function convertToHoursMinutes(input) {
    const number = parseInt(input, 10);

    if (isNaN(number)) {
      return WRONG_FORMAT_ERROR_MSG;
    }
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className="card">
      <img className="card__img" src={url} alt={title} />
      <div className="card__naming">
        <h2 className="card__name">{title}</h2>
        <div className="card__like">
          {location.pathname === MOVIES_ROUT && (
            <button
              type="button"
              className={`card__like-button ${
                isLiked && "card__like-button_active"
              }`}
              onClick={handleLikeClick}
            ></button>
          )}
          {location.pathname === SAVE_MOVIES_ROUT && (
            <button
              type="button"
              className={`card__like-button ${
                isLiked && "card__like-button_close"
              }`}
              onClick={handleLikeClick}
            ></button>
          )}
        </div>
      </div>
      <div className="card__duration">{convertToHoursMinutes(duration)}</div>
    </li>
  );
};
