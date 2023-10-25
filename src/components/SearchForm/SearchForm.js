import "./SearchForm.scss";

import { FilterCheckbox } from "../FilterCheckbox/FilterCheckbox";

import { useState } from "react";

export const SearchForm = ({ onSearch, isShorts, setIsShorts, errorText, error }) => {
  const [query, setQuery] = useState(localStorage.getItem("query") || "");
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
                localStorage.setItem("query", e.target.value);
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
