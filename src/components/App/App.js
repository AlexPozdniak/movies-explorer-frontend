import "./App.scss";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const onOpenBurger = () => {
    setIsBurgerOpen(true);
  };

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
                <Movies />
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/signin"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <SavedMovies />
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} redirect={"/signin"}>
                <Header isLoggedIn={isLoggedIn} onOpenBurger={onOpenBurger} />
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/signin" element={<Login />}></Route>
          <Route path="*" element={<EmptyPage />}></Route>
        </Routes>
        {isBurgerOpen && <Sidebar closeMenu={setIsBurgerOpen} />}
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
