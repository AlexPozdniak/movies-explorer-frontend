import "./SavedMovies.scss";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ERROR_MSG_KEY_WORD, ERROR_MSG_NOT_FOUND, FILTERED_MOVIES_LOCAL_KEY, FILTERED_SAVE_MOVIES_LOCAL_KEY, FILTERED_SAVE_SHORTS_LOCAL_KEY, FILTERED_SHORTS_LOCAL_KEY, MOVIES_ROUT, QUERRY_LOCAL_KEY } from "../../utils/constants";

export const SavedMovies = ({
  movies,
  shortMovies,
  savedMovies,
  onDislike,
  onLike,
}) => {
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem(FILTERED_SAVE_MOVIES_LOCAL_KEY)) || movies
  );
  const [filteredShorts, setFilteredShorts] = useState(
    JSON.parse(localStorage.getItem(FILTERED_SAVE_SHORTS_LOCAL_KEY)) || shortMovies
  );
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isShorts, setIsShorts] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem(QUERRY_LOCAL_KEY) || "") {
      if (isShorts) {
        setFilteredMovies(
          filterMoviesByQuerry(
            savedMovies.filter((film) => film.duration <= 40),
            localStorage.getItem(QUERRY_LOCAL_KEY) || ""
          )
        );
      } else {
        setFilteredMovies(
          filterMoviesByQuerry(savedMovies, localStorage.getItem(QUERRY_LOCAL_KEY) || "")
        );
      }
    } else {
      if (isShorts) {
        setFilteredMovies(savedMovies.filter((film) => film.duration <= 40));
      } else {
        setFilteredMovies(savedMovies);
      }
    }
    if (localStorage.getItem(QUERRY_LOCAL_KEY) || "") {
      if (isShorts) {
        setFilteredShorts(
          filterMoviesByQuerry(
            savedMovies.filter((film) => film.duration <= 40),
            localStorage.getItem(QUERRY_LOCAL_KEY) || ""
          )
        );
      } else {
        setFilteredShorts(
          filterMoviesByQuerry(savedMovies, localStorage.getItem(QUERRY_LOCAL_KEY) || "")
        );
      }
    } else {
      if (isShorts) {
        setFilteredShorts(savedMovies.filter((film) => film.duration <= 40));
      } else {
        setFilteredShorts(savedMovies);
      }
    }
  }, [savedMovies, isShorts, localStorage.getItem(QUERRY_LOCAL_KEY)]);

  function filterMoviesByQuerry(movies, query) {
    if (!query) {
      return movies;
    }
    const filteredMovies = movies.filter(
      (movie) =>
        movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredMovies.length === 0) {
      setError(true);
      setErrorText(ERROR_MSG_NOT_FOUND);
    } else if (query.length === 0) {
      setError(true);
      setErrorText(ERROR_MSG_KEY_WORD);
    } else {
      setError(false);
    }
    return filteredMovies;
  }

  function handleSearch(query) {
    if (location.pathname === MOVIES_ROUT) {
      setFilteredMovies(filterMoviesByQuerry(movies, query));
      localStorage.setItem(
        FILTERED_MOVIES_LOCAL_KEY,
        JSON.stringify(filterMoviesByQuerry(movies, query))
      );
      setFilteredShorts(filterMoviesByQuerry(shortMovies, query));
      localStorage.setItem(
        FILTERED_SHORTS_LOCAL_KEY,
        JSON.stringify(filterMoviesByQuerry(shortMovies, query))
      );
    } else {
      setFilteredMovies(filterMoviesByQuerry(movies, query));
      localStorage.setItem(
        FILTERED_SAVE_MOVIES_LOCAL_KEY,
        JSON.stringify(filterMoviesByQuerry(movies, query))
      );
      setFilteredShorts(filterMoviesByQuerry(shortMovies, query));
      localStorage.setItem(
        FILTERED_SAVE_SHORTS_LOCAL_KEY,
        JSON.stringify(filterMoviesByQuerry(shortMovies, query))
      );
    }
  }

  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <SearchForm
          onSearch={handleSearch}
          isShorts={isShorts}
          setIsShorts={setIsShorts}
          errorText={errorText}
          error={error}
        />
        <MoviesCardList
          movies={filteredMovies}
          shortMovies={filteredShorts}
          isShorts={isShorts}
          savedMovies={savedMovies}
          onLike={onLike}
          onDislike={onDislike}
        />
      </div>
    </main>
  );
};
