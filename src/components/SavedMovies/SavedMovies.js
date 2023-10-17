import "./SavedMovies.scss";
import { MoviesCardList } from "../MoviesCardList/MoviesCardList";
import { SearchForm } from "../SearchForm/SearchForm";

export const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <div className="saved-movies__container">
        <SearchForm />
        <MoviesCardList />
      </div>
    </main>
  );
};
