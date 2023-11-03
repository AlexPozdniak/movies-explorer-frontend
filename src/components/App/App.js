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
import { ERROR_ROUT, JWT_LOCAL_KEY, MAIN_ROUT, MOVIES_ROUT, PROFILE_ROUT, SAVE_MOVIES_ROUT, SIGN_IN_ROUT, SIGN_UP_ROUT } from "../../utils/constants";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(JWT_LOCAL_KEY) ? true : false
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
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const login = ({email, password}) => {
    setIsLoading(true);
    return mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem(JWT_LOCAL_KEY, res.token);
          setIsLoggedIn(true);
          setIsSuccessful(true);
          checkToken();
          navigate(MOVIES_ROUT);
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

  const register = ({name, email, password}) => {
    setIsLoading(true);
    return mainApi
      .register(name, email, password)
      .then((res) => {
        setIsSuccessful(true);
        login({email, password});
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

  const checkToken = () => {
    const jwt = localStorage.getItem(JWT_LOCAL_KEY);
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
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setIsInfoPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const makeFavorite = (movie) => {
    setIsLoading(true);
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies([res.data, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeFavorite = (movie) => {
    setIsLoading(true);
    mainApi
      .removeMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies.filter((m) => m._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
        setIsInfoPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateUser = (user) => {
    setIsLoading(true);
    mainApi
      .updateUser(user)
      .then((res) => {
        setCurrentUser(res.data);
        setIsSuccessful(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessful(false);
      })
      .finally(() => {
        setIsInfoPopupOpen(true);
        setIsLoading(false);
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
            path={MAIN_ROUT}
            element={
              <>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <Main />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path={MOVIES_ROUT}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={MAIN_ROUT}>
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
            path={SAVE_MOVIES_ROUT}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={MAIN_ROUT}>
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
            path={PROFILE_ROUT}
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={MAIN_ROUT}>
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
            path={SIGN_UP_ROUT}
            element={
              <Register
                onRegister={register}
                isLoading={isLoading}
                isLoggedIn={isLoggedIn}
              />
            }
          ></Route>
          <Route
            path={SIGN_IN_ROUT}
            element={<Login onLogin={login} isLoading={isLoading} isLoggedIn={isLoggedIn}/>}
          ></Route>
          <Route path={ERROR_ROUT} element={<EmptyPage />}></Route>
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
