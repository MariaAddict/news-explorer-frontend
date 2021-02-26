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
import apiMain from "../../utils/MainApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

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
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    _id: "",
  });
  const [saveArticles, setSaveArticles] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      apiMain
        .getUserData()
        .then((dataUser) => {
          console.log("user data: ", dataUser);
          setCurrentUser(dataUser);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (location.pathname === "/") {
      setMainTheme(true);
    }
    if (location.pathname === "/saved-news") {
      setMainTheme(false);
    }
  }, [location]);

  //check token
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    apiMain
      .getContent(jwt)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    apiNews
      .getNews(word)
      .then((data) => {
        console.log(data);
        if (data.totalResults === 0) {
          setIsNotFoundArticles(true);
        } else {
          setIsNewsCardList(true);
          setArticles(data.articles);
          localStorage.setItem("articles", JSON.stringify(data.articles));
          localStorage.setItem("search-word", word);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorApiNews(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  function handleButtonCardListClick() {
    setNumberOfArticles(numberOfArticles + 3);
  }

  function onSignUp(email, password, name) {
    setRegistrationError(false);
    apiMain
      .register(email, password, name)
      .then((user) => {
        if (user) {
          setIsRegisterModalOpen(false);
          setInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        if (err === 409) {
          setRegistrationError(true);
        }
        console.log(err);
      });
  }

  function onLogin(email, password) {
    apiMain
      .authorization(email, password)
      .then((user) => {
        if (user.token) {
          localStorage.setItem("jwt", user.token);
          setLoggedIn(true);
          setIsLoginModalOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  function handleSaveNews(card) {
    const word = localStorage.getItem("search-word");

      apiMain.saveNews(word, card)
        .then((newCard) => {
          const cardElement = {
            keyword: word,
            title: newCard.title,
            description: newCard.text,
            publishedAt: newCard.data,
            source: {
              name: newCard.source
            },
            url: newCard.link,
            urlToImage: newCard.image,
            _id: newCard._id,
            owner: newCard.owner,
            index: card.index
          }

          setSaveArticles(cardElement, ...saveArticles);
          
          const newCards = articles.map((c, i) => i === cardElement.index ? cardElement : c);
          setArticles(newCards);
          localStorage.setItem("articles", JSON.stringify(newCards));
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main
              mainTheme={mainTheme}
              onClickAuth={handleLoginClick}
              isLoginModalOpen={isLoginModalOpen}
              isRegisterModalOpen={isRegisterModalOpen}
              submitSearchForm={submitSearchForm}
              articles={articles}
              loader={loader}
              isNewsCardList={isNewsCardList}
              isNotFoundArticles={isNotFoundArticles}
              handleButtonCardListClick={handleButtonCardListClick}
              numberOfArticles={numberOfArticles}
              errorApiNews={errorApiNews}
              loggedIn={loggedIn}
              signOut={signOut}
              handleSaveNews={handleSaveNews}
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
          onSignUp={onSignUp}
          registrationError={registrationError}
        />
        <InfoTooltip
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          openLoginModal={handleLoginClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
