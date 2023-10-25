import "./Movies.scss";

import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";

export const Movies = ({ movies, shortMovies, onLike, onDislike, savedMovies }) => {
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredMovies")) || []
  );
  const [filteredShorts, setFilteredShorts] = useState(
    JSON.parse(localStorage.getItem("filteredShorts")) || []
  );
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  // const [shortMovies, setShortMovies] = useState(getShorts(movies));
  const [isShorts, setIsShorts] = useState(
    localStorage.getItem("checked") === "true" ? true : false
  );

  function getShorts(movies) {
    return movies.filter((movie) => movie.duration < 45);
  }
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
      setErrorText("Ничего не найдено");
    } else if (query.length === 0) {
      setError(true);
      setErrorText("Нужно ввести ключевое слово");
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
