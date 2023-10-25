import "./FilterCheckbox.scss";

export const FilterCheckbox = ({ isShorts, setIsShorts }) => {
  const handleCheckboxChange = (event) => {
    setIsShorts((prev) => !prev);
    localStorage.setItem("checked", !isShorts);
  }
  return (
    <label className="filtercheckbox">
      <input type="checkbox" className="filtercheckbox__input" checked={isShorts}></input>
      <span className="filtercheckbox__check" onClick={handleCheckboxChange}></span>
      <span className="filtercheckbox__text">Короткометражки</span>
    </label>
  );
};
