import "./Main.scss";

import { Promo } from "../Promo/Promo";
import { AboutProject } from "../AboutProject/AboutProject";
import { Techs } from "../Techs/Techs";
import { Portfolio } from "../Portfolio/Portfolio";

export const Main = () => {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
    </main>
  );
};
