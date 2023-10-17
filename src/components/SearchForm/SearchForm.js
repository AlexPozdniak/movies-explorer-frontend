import "./SearchForm.scss";
import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";

export const SearchForm = () => {
  return (
    <section className="search">
      <form class="search__form">
        <div className="search__container">
          <label class="search__label">
            <input class="search__input" placeholder="Фильм" required></input>
          </label>
          <button type="submit" class="search__button">
            Найти
          </button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
};
