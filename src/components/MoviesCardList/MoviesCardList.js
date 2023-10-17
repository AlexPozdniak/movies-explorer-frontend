import "./MoviesCardList.scss";

import { MoviesCard } from "../MoviesCard/MoviesCard";

import pg from "../../images/pg.png";
import banksy from "../../images/banksy.png";
import war from "../../images/war.png";

export const MoviesCardList = () => {
  const movies = [
    {
      url: pg,
      title: "Пи Джей Харви: A dog called money",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: banksy,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: war,
      title: "Война искусств",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: pg,
      title: "Пи Джей Харви: A dog called money",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: banksy,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: war,
      title: "Война искусств",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: pg,
      title: "Пи Джей Харви: A dog called money",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: banksy,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: war,
      title: "Война искусств",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: pg,
      title: "Пи Джей Харви: A dog called money",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: banksy,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: war,
      title: "Война искусств",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: pg,
      title: "Пи Джей Харви: A dog called money",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: banksy,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: war,
      title: "Война искусств",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: pg,
      title: "Пи Джей Харви: A dog called money",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },

    {
      url: banksy,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: war,
      title: "Война искусств",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },
    {
      url: banksy,
      title: "В погоне за Бенкси",
      duration: "1ч42м",
      isLiked: true,
      id: Math.random(),
    },

    {
      url: war,
      title: "Война искусств",
      duration: "1ч42м",
      isLiked: false,
      id: Math.random(),
    },
  ];

  return (
    <section className="movies-items">
      <ul className="movies-items__container">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            url={movie.url}
            title={movie.title}
            duration={movie.duration}
            isLiked={movie.isLiked}
          />
        ))}
      </ul>
      {movies.length && (
        <button type="button" className="movies-items__more">
          Ещё
        </button>
      )}
    </section>
  );
};
