import "./FilterCheckbox.scss";

export const FilterCheckbox = () => {
  return (
    <label className="filtercheckbox">
      <input type="checkbox" className="filtercheckbox__input"></input>
      <span className="filtercheckbox__check"></span>
      <span className="filtercheckbox__text">Короткометражки</span>
    </label>
  );
};
