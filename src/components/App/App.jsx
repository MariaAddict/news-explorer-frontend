import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";
import apiNews from "../../utils/NewsApi.js";
import apiMain from '../../utils/MainApi.js';

function App() {
  const location = useLocation();
  const [mainTheme, setMainTheme] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [isNewsCardList, setIsNewsCardList] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isNotFoundArticles, setIsNotFoundArticles] = useState(false);
  const [numberOfArticles, setNumberOfArticles] = useState(3);
  const [errorApiNews, setErrorApiNews] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: '', name: '', _id: '' });


//   useEffect(() => {
//     if (loggedIn) {
//       apiMain.getUserInfo().then((dataUser) => {
//         setCurrentUser(dataUser);
//     }).catch(err => {
//         console.log(err);
//     });
// }
// }, [loggedIn]);
  useEffect(() => {
    if (location.pathname === "/") {
      setMainTheme(true);
    }
    if (location.pathname === "/saved-news") {
      setMainTheme(false);
    }
  }, [location]);

  function handleLoginClick() {
    setIsLoginModalOpen(true);
  }

  function handleRegistrationClick() {
    setIsRegisterModalOpen(true);
  }

  function closeAllPopups() {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setInfoTooltipOpen(false);
  }

  function submitSearchForm(word) {
    setErrorApiNews(false);
    setIsNewsCardList(false);
    setIsNotFoundArticles(false);
    setLoader(true);
    setNumberOfArticles(3);
    apiNews.getNews(word).then(data => {
      console.log(data);
      if (data.totalResults === 0) {
        setIsNotFoundArticles(true);
      } else {
        setIsNewsCardList(true);
        setArticles(data.articles);
        localStorage.setItem('articles', JSON.stringify(data.articles));
        localStorage.setItem('search-word', word);
      }
    }
    ).catch(err => {
      console.log(err);
      setErrorApiNews(true);
  }).finally(() => {
    setLoader(false);
  });
  }

  function handleButtonCardListClick() {
    setNumberOfArticles(numberOfArticles + 3);
  }

  function onSignUp(email, password, name) {
    setRegistrationError(false);
    apiMain.register(email, password, name).then((user) => {
      if (user) {
        setIsRegisterModalOpen(false);
        setInfoTooltipOpen(true);
      }
    }).catch(err => {
      if (err === 409) {
        setRegistrationError(true);
      }
      console.log(err);
  });
  }

  function onLogin(email, password) {
    apiMain.authorization(email, password).then((user) => {
      if (user.token) {
        localStorage.setItem('jwt', user.token);
        setLoggedIn(true);
        setIsLoginModalOpen(false);
    }
    }).catch(err => {
      console.log(err);
  });
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main
            mainTheme={mainTheme}
            onClickAuth={handleLoginClick}
            isLoginModalOpen={isLoginModalOpen}
            isRegisterModalOpen={isRegisterModalOpen}
            submitSearchForm = {submitSearchForm}
            articles={articles}
            loader= {loader}
            isNewsCardList= {isNewsCardList}
            isNotFoundArticles= {isNotFoundArticles}
            handleButtonCardListClick = {handleButtonCardListClick}
            numberOfArticles= {numberOfArticles}
            errorApiNews = {errorApiNews}
          />
        </Route>
        <Route path="/saved-news">
          <SavedNews mainTheme={mainTheme} onClickAuth={handleLoginClick} />
        </Route>
      </Switch>
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeAllPopups}
        openRegistrationModal={handleRegistrationClick}
        onLogin={onLogin}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeAllPopups}
        openLoginModal={handleLoginClick}
        onSignUp = {onSignUp}
        registrationError = {registrationError}
      />
      <InfoTooltip
        isOpen={infoTooltipOpen}
        onClose={closeAllPopups}
        openLoginModal={handleLoginClick}
      />
    </div>
  );
}

export default App;
