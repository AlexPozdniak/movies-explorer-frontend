import "./Movies.scss";

import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { useState } from "react";

import { ERROR_MSG_NOT_FOUND, ERROR_MSG_KEY_WORD } from "../../utils/constants";

export const Movies = ({
  movies,
  shortMovies,
  onLike,
  onDislike,
  savedMovies,
}) => {
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredMovies")) || []
  );
  const [filteredShorts, setFilteredShorts] = useState(
    JSON.parse(localStorage.getItem("filteredShorts")) || []
  );
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isShorts, setIsShorts] = useState(
    localStorage.getItem("checked") === "true" ? true : false
  );

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
  }

  return (
    <main className="movies">
      <div className="movies__container">
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
          onLike={onLike}
          onDislike={onDislike}
          savedMovies={savedMovies}
        />
      </div>
    </main>
  );
};
