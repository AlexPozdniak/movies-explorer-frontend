import "./MoviesCard.scss";

import { useLocation } from "react-router-dom";

export const MoviesCard = ({ url, title, duration, trailerLink, isLiked, onLike, onDislike, movie, _id }) => {
  // console.log(movie)
  // console.log(url)
  // console.log(_id)
  const location = useLocation();
  const handleLikeClick = () => {
    if (isLiked) {
      if (location.pathname === '/movies') {
        onDislike({_id});
      } else {
        movie.movieId = movie.id
        console.log(movie, 'this card was disliked')
        onDislike(movie);
      }


    } else {
      
      // movie.movieId = movie.id
      console.log(movie, 'this card was liked')
      onLike(movie);

    }
  }
  return (
    <li className="card">
      <img className="card__img" src={url} alt={title} />
      <div className="card__naming">
        <h2 className="card__name">{title}</h2>
        <div className="card__like">
          {location.pathname === '/movies' && <button
            type="button"
            className={`card__like-button ${
              isLiked && "card__like-button_active"
            }`}
            onClick={handleLikeClick}
          ></button>}
          {location.pathname === '/saved-movies' && <button
            type="button"
            className={`card__like-button ${
              isLiked && "card__like-button_close"
            }`}
            onClick={handleLikeClick}
          ></button>}
          
        </div>
      </div>
      <div className="card__duration">{duration}</div>
    </li>
  );
};
