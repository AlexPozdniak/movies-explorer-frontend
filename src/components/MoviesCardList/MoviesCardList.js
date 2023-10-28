import "./MoviesCardList.scss";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../utils/constants";

export const MoviesCardList = ({
  movies,
  shortMovies,
  isShorts,
  onLike,
  onDislike,
  savedMovies,
}) => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(true);
  const [cardsCount, setCardsCount] = useState(
    getCardsPerRow() * getStartRowCount()
  );
  useEffect(() => {
    if (isShorts) {
      if (shortMovies.length < cardsCount) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    } else {
      if (movies.length < cardsCount) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    }
  }, [cardsCount, movies, shortMovies, isShorts]);

  const handleShowMore = () => {
    setCardsCount((prev) => prev + getCardsPerRow());

    if (isShorts) {
      if (shortMovies.length < cardsCount) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    } else {
      if (movies.length < cardsCount) {
        setShowMore(false);
      } else {
        setShowMore(true);
      }
    }
  };

  function isItemInArray(item) {
    if (location.pathname === "/saved-movies") {
      return savedMovies.some((arrItem) => {
        return arrItem.movieId === item.movieId;
      });
    } else {
      return savedMovies.some((arrItem) => {
        return arrItem.movieId === item.id;
      });
    }
  }
  function getSavedMovieId(savedMovies, id) {
    const savedMovie = savedMovies.find((item) => item.movieId === id);
    return savedMovie ? savedMovie._id : null;
  }

  function getCardsPerRow() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) return 4;
    if (screenWidth >= 480) return 2;
    return 1;
  }

  function getStartRowCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) return 4;
    if (screenWidth >= 480) return 8;
    return 5;
  }

  return (
    <section className="movies-items">
      <ul className="movies-items__container">
        {!isShorts &&
          movies
            .slice(0, cardsCount)
            .map((movie) => (
              <MoviesCard
                key={movie.id || Math.random()}
                url={
                  location.pathname === "/saved-movies"
                    ? movie.image
                    : `${API_URL}${movie.image.url}`
                }
                title={movie.nameRU}
                duration={movie.duration}
                isLiked={isItemInArray(movie)}
                trailerLink={movie.trailerLink}
                onLike={onLike}
                onDislike={onDislike}
                movie={movie}
                _id={getSavedMovieId(savedMovies, movie.id)}
              />
            ))}
        {isShorts &&
          shortMovies
            .slice(0, cardsCount)
            .map((movie, idx, arr) => (
              <MoviesCard
                key={movie.id || Math.random()}
                url={
                  location.pathname === "/saved-movies"
                    ? movie.image
                    : `${API_URL}${movie.image.url}`
                }
                title={movie.nameRU}
                duration={movie.duration}
                isLiked={isItemInArray(movie)}
                trailerLink={movie.trailerLink}
                onLike={onLike}
                onDislike={onDislike}
                movie={movie}
                _id={getSavedMovieId(savedMovies, movie.id)}
              />
            ))}
      </ul>
      {showMore && (
        <button
          type="button"
          className="movies-items__more"
          onClick={handleShowMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
};
