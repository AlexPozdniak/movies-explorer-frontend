import "./SavedMovies.scss";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { ERROR_MSG_KEY_WORD, ERROR_MSG_NOT_FOUND } from "../../utils/constants";

export const SavedMovies = ({
  movies,
  shortMovies,
  savedMovies,
  onDislike,
  onLike,
}) => {
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredSaveMovies")) || movies
  );
  const [filteredShorts, setFilteredShorts] = useState(
    JSON.parse(localStorage.getItem("filteredSaveShorts")) || shortMovies
  );
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isShorts, setIsShorts] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("query") || "") {
      if (isShorts) {
        setFilteredMovies(
          filterMoviesByQuerry(
            savedMovies.filter((film) => film.duration <= 40),
            localStorage.getItem("query") || ""
          )
        );
      } else {
        setFilteredMovies(
          filterMoviesByQuerry(savedMovies, localStorage.getItem("query") || "")
        );
      }
    } else {
      if (isShorts) {
        setFilteredMovies(savedMovies.filter((film) => film.duration <= 40));
      } else {
        setFilteredMovies(savedMovies);
      }
    }
    if (localStorage.getItem("query") || "") {
      if (isShorts) {
        setFilteredShorts(
          filterMoviesByQuerry(
            savedMovies.filter((film) => film.duration <= 40),
            localStorage.getItem("query") || ""
          )
        );
      } else {
        setFilteredShorts(
          filterMoviesByQuerry(savedMovies, localStorage.getItem("query") || "")
        );
      }
    } else {
      if (isShorts) {
        setFilteredShorts(savedMovies.filter((film) => film.duration <= 40));
      } else {
        setFilteredShorts(savedMovies);
      }
    }
  }, [savedMovies, isShorts, localStorage.getItem("query")]);

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
    if (location.pathname === "/movies") {
      setFilteredMovies(filterMoviesByQuerry(movies, query));
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(filterMoviesByQuerry(movies, query))
      );
      setFilteredShorts(filterMoviesByQuerry(shortMovies, query));
      localStorage.setItem(
        "filteredShorts",
        JSON.stringify(filterMoviesByQuerry(shortMovies, query))
      );
    } else {
      setFilteredMovies(filterMoviesByQuerry(movies, query));
      localStorage.setItem(
        "filteredSavedMovies",
        JSON.stringify(filterMoviesByQuerry(movies, query))
      );
      setFilteredShorts(filterMoviesByQuerry(shortMovies, query));
      localStorage.setItem(
        "filteredSavedShorts",
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
