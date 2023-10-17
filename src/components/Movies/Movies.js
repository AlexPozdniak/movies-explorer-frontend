import "./Movies.scss";

import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";

export const Movies = () => {
  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm />
        <MoviesCardList />
      </div>
    </main>
  );
};
