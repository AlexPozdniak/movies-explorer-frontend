import { CHECKBOX_LOCAL_KEY, MOVIES_ROUT } from "../../utils/constants";
import "./FilterCheckbox.scss";

import { useLocation } from "react-router-dom";

export const FilterCheckbox = ({ isShorts, setIsShorts }) => {
  const location = useLocation();
  const handleCheckboxChange = () => {
    setIsShorts((prev) => !prev);
    if (location.pathname === MOVIES_ROUT) {
      localStorage.setItem(CHECKBOX_LOCAL_KEY, !isShorts);
    }
  };
  return (
    <label className="filtercheckbox">
      <input
        type="checkbox"
        className="filtercheckbox__input"
        checked={isShorts}
      ></input>
      <span
        className="filtercheckbox__check"
        onClick={handleCheckboxChange}
      ></span>
      <span className="filtercheckbox__text">Короткометражки</span>
    </label>
  );
};
