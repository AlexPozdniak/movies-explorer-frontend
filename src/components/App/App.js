import "./App.scss";

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Sidebar } from "../Sidebar/Sidebar";
import { EmptyPage } from "../EmptyPage/EmptyPage";

import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

import { useMemo } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("jwt") ? true : false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const shortMovies = useMemo(()=> getShorts(movies), [movies])
  const savedShortMovies =useMemo(()=> getShorts(savedMovies), [savedMovies])

  const navigate = useNavigate();
  const location = useLocation();

  function getShorts(movies) {
    return movies.filter(movie => movie.duration < 45);
  }

  const onOpenBurger = () => {
    setIsBurgerOpen(true);
  };

  const getStartedMovies = () => {
    setIsLoading(true);
    Promise.all([moviesApi.getMovies(), mainApi.getMovies()])
      .then(([moviesResponse, savedMoviesResponse]) => {
        setMovies(moviesResponse);
        setSavedMovies(savedMoviesResponse.data);
        console.log('savedMoviesResponse', savedMoviesResponse)
      })
      .catch((error) => {
        console.error("Ошибка при загрузке фильмов:", error);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("Операции завершены");
      });
  };

  const login = (email, password) => {
    setIsLoading(true);
    return mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) { 
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          navigate("/");
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("Операции завершены");
      })
  };
 
  const register = (name, email, password) => {
    setIsLoading(true);
    return mainApi
      .register(name, email, password)
      .then((res) => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("Операции завершены");
      })
  };

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoading(true);
      return mainApi
      .check(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          console.log(res.data)
          setCurrentUser(res.data);
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("Операции завершены");
      })
    }
  }

  const makeFavorite = (movie) => {
    mainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([res.data, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const removeFavorite = (movie) => {
    mainApi.removeMovie(movie._id)
      .then((res) => {
        setSavedMovies(savedMovies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getStartedMovies();
    }

  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <Main />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/signin"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <Movies movies={movies} shortMovies={shortMovies} onLike={makeFavorite} onDislike={removeFavorite} savedMovies={savedMovies}/>
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/signin"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <SavedMovies movies={savedMovies} onLike={makeFavorite} onDislike={removeFavorite} shortMovies={savedShortMovies} savedMovies={savedMovies}/>
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/signin"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <Profile onLogout={logout} />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signup" element={<Register onRegister={register} isLoggedIn={isLoggedIn}/>}></Route>
          <Route path="/signin" element={<Login onLogin={login} />}></Route>
          <Route path="*" element={<EmptyPage />}></Route>
        </Routes>
        {isBurgerOpen && <Sidebar closeMenu={setIsBurgerOpen} />}
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
