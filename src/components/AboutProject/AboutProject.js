import "./AboutProject.scss";

import { Weeks } from "../Weeks/Weeks";


export const AboutProject = () => {
  return (
    <section className="about-project" id="about">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__articles">
          <div className="about-project__article">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__article">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <Weeks />
      </div>
    </section>
  );
};
