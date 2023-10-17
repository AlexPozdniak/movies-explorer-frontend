import "./MoviesCard.scss";

export const MoviesCard = ({ url, title, duration, isLiked }) => {
  return (
    <li className="card">
      <img className="card__img" src={url} alt={title} />
      <div className="card__naming">
        <h2 className="card__name">{title}</h2>
        <div className="card__like">
          <button
            type="button"
            className={`card__like-button ${
              isLiked && "card__like-button_active"
            }`}
          ></button>
        </div>
      </div>
      <div className="card__duration">{duration}</div>
    </li>
  );
};
