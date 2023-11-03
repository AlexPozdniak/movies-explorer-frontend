import "./SearchForm.scss";

import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";

import { useState } from "react";
import { QUERRY_LOCAL_KEY } from "../../utils/constants";

export const SearchForm = ({ onSearch, isShorts, setIsShorts, errorText, error }) => {
  const [query, setQuery] = useState(localStorage.getItem(QUERRY_LOCAL_KEY) || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__container">
          <label className="search__label">
            <input
              onChange={(e) => {
                setQuery(e.target.value);
                localStorage.setItem(QUERRY_LOCAL_KEY, e.target.value);
              }}
              className="search__input"
              placeholder="Фильм"
              required
              value={query}
            ></input>
          </label>
          <button type="submit" className="search__button">
            Найти
          </button>
        </div>
        {error ? <span className="search__error">{errorText}</span> : ""}
        <FilterCheckbox isShorts={isShorts} setIsShorts={setIsShorts}/>
      </form>
    </section>
  );
};
