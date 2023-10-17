import "./Weeks.scss";

export const Weeks = () => {
  return (
    <div className="weeks">
      <div className="weeks__wrapper">
        <p className="weeks__green-line">1 неделя</p>
        <p className="weeks__gray-line">4 недели</p>
      </div>
      <div className="weeks__wrapper">
        <p className="weeks__back">Back-end</p>
        <p className="weeks__front">Front-end</p>
      </div>
    </div>
  );
};
