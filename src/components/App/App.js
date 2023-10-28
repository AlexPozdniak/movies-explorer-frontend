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
import InfoPopup from "../InfoPopup/InfoPopup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt") ? true : false
  );
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const shortMovies = useMemo(() => getShorts(movies), [movies]);
  const savedShortMovies = useMemo(() => getShorts(savedMovies), [savedMovies]);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  function getShorts(movies) {
    return movies.filter((movie) => movie.duration < 45);
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
      })
      .catch((error) => {
        setIsSuccessful(false);
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
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
          setIsSuccessful(true);
          navigate("/movies");
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoPopupOpen(true);
      });
  };

  const register = (name, email, password) => {
    setIsLoading(true);
    return mainApi
      .register(name, email, password)
      .then(() => {
        setIsSuccessful(true);
        navigate("/signin");
      })
      .catch(() => {
        setIsSuccessful(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsInfoPopupOpen(true);
      });
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
            setCurrentUser(res.data);
          }
          return res;
        })
        .catch(() => {
          setIsLoading(false);
          setIsInfoPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const makeFavorite = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies([res.data, ...savedMovies]);
      })
      .catch(() => {
        setIsLoading(false);
        setIsInfoPopupOpen(true);
      });
  };

  const removeFavorite = (movie) => {
    console.log(movie);
    mainApi
      .removeMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((m) => m._id !== movie._id));
      })
      .catch(() => {
        setIsLoading(false);
        setIsInfoPopupOpen(true);
      });
  };

  const updateUser = (user) => {
    mainApi
      .updateUser(user)
      .then((res) => {
        setCurrentUser(res.data);
        setIsSuccessful(true);
      })
      .catch(() => {
        setIsSuccessful(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
      });
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

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
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <Movies
                  movies={movies}
                  shortMovies={shortMovies}
                  onLike={makeFavorite}
                  onDislike={removeFavorite}
                  savedMovies={savedMovies}
                />
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <SavedMovies
                  movies={savedMovies}
                  onLike={makeFavorite}
                  onDislike={removeFavorite}
                  shortMovies={savedShortMovies}
                  savedMovies={savedMovies}
                />
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <Profile
                  onLogout={logout}
                  onUpdateUser={updateUser}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Register
                onRegister={register}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/signin"
            element={<Login onLogin={login} isLoading={isLoading} />}
          ></Route>
          <Route path="*" element={<EmptyPage />}></Route>
        </Routes>
        {isBurgerOpen && <Sidebar closeMenu={setIsBurgerOpen} />}
        <InfoPopup
          isOpen={isInfoPopupOpen}
          onClose={setIsInfoPopupOpen}
          isSuccessful={isSuccessful}
          path={location.pathname}
          navigate={navigate}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
