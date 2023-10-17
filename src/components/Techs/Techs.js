import "./Techs.scss";

export const Techs = () => {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <div className="techs__description">
          <h3 className="techs__subtitle">7 технологий</h3>
          <p className="techs__text">
            На курсе веб-разработки мы освоили технологии, которые применили в
            дипломном проекте.
          </p>
        </div>
        <ul className="techs__technologies">
          <li className="techs__technologie">HTML</li>
          <li className="techs__technologie">CSS</li>
          <li className="techs__technologie">JS</li>
          <li className="techs__technologie">React</li>
          <li className="techs__technologie">Git</li>
          <li className="techs__technologie">Express.js</li>
          <li className="techs__technologie">mongoDB</li>
        </ul>
      </div>
    </section>
  );
};
