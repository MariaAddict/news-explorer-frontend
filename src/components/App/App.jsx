import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";
import apiNews from "../../utils/NewsApi.js";
import apiMain from "../../utils/MainApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const location = useLocation();
  const [saveArticles, setSaveArticles] = useState([]);
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
  const [isSaveNewsCardList, setIsSaveNewsCardList] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLocalStorageData, setIsLocalStorageData] = useState(false);
  const history = useHistory();

  useEffect(() => {
    //check token
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

    //data search result
    const searchWord = localStorage.getItem("search-word");
    const searchArticles = JSON.parse(localStorage.getItem("articles"));
    if (searchArticles == null) {
      setIsLocalStorageData(false);
    } else {
      setKeyword(searchWord);
      setIsLocalStorageData(true);
      setArticles(searchArticles);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([apiMain.getUserData(), apiMain.getSaveArticles()])
        .then(([dataUser, dataSaveArticles]) => {
          setCurrentUser(dataUser);
          const dataArticles = dataSaveArticles.map((card) => {
            const newCard = {
              keyword: card.keyword,
              title: card.title,
              description: card.text,
              publishedAt: card.data,
              source: {
                name: card.source,
              },
              url: card.link,
              urlToImage: card.image,
              _id: card._id,
              index: card.index,
            };
            return newCard;
          });
          setSaveArticles(dataArticles);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (saveArticles.length === 0) {
      setIsSaveNewsCardList(false);
    } else {
      setIsSaveNewsCardList(true);
    }
  }, [saveArticles]);

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
    setIsLocalStorageData(false);
    setLoader(true);
    setNumberOfArticles(3);
    apiNews
      .getNews(word)
      .then((data) => {
        if (data.totalResults === 0) {
          setIsNotFoundArticles(true);
        } else {
          setIsNewsCardList(true);
          
          if (loggedIn) {
            const searchArticles = data.articles.map(el => {
              const isSavedNews = saveArticles.some(item => {
                return item.url === el.url;
              });
              if (isSavedNews) {
                el.owner = currentUser._id;
              }
              return el;
          });
          setArticles(searchArticles);
          localStorage.setItem("articles", JSON.stringify(searchArticles));
        } else {
          localStorage.setItem("articles", JSON.stringify(data.articles));
          setArticles(data.articles);
        }
        }
          localStorage.setItem("search-word", word);
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
          setIsLocalStorageData(false);
          localStorage.removeItem("articles");
          localStorage.removeItem("search-word");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/");
    setIsLocalStorageData(false);
    localStorage.removeItem("articles");
    localStorage.removeItem("search-word");
  }

  function handleSaveNews(card) {
    const word = localStorage.getItem("search-word");

    apiMain
      .saveNews(word, card)
      .then((newCard) => {
        const cardElement = {
          keyword: word,
          title: newCard.title,
          description: newCard.text,
          publishedAt: newCard.data,
          source: {
            name: newCard.source,
          },
          url: newCard.link,
          urlToImage: newCard.image,
          _id: newCard._id,
          owner: newCard.owner,
          index: card.index,
        };

        setSaveArticles([cardElement, ...saveArticles]);

        const newCards = articles.map((c, i) =>
          i === cardElement.index ? cardElement : c
        );
        setArticles(newCards);
        localStorage.setItem("articles", JSON.stringify(newCards));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteNews(idArticles, card) {
    const word = localStorage.getItem("search-word");
    apiMain
      .deleteNews(idArticles)
      .then((data) => {
        const newArticles = saveArticles.filter((c) => !(c._id === idArticles));
        setSaveArticles(newArticles); 

        const newElement = {
          keyword: word,
          title: data.title,
          description: data.text,
          publishedAt: data.data,
          source: {
            name: data.source,
          },
          url: data.link,
          urlToImage: data.image,
          index: card.index,
        };
        
        const articlesNotMarked = articles.map((c, i) => {
          return i === newElement.index ? newElement : c;
        }
        
      );
      setArticles(articlesNotMarked);
      localStorage.setItem("articles", JSON.stringify(articlesNotMarked));
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
              keyword={keyword}
              isLocalStorageData={isLocalStorageData}
              handleDeleteNews={handleDeleteNews}
            />
          </Route>
          <ProtectedRoute
            path="/saved-news/"
            component={SavedNews}
            loggedIn={loggedIn}
            mainTheme={mainTheme}
            onClickAuth={handleLoginClick}
            saveArticles={saveArticles}
            handleButtonCardListClick={handleButtonCardListClick}
            signOut={signOut}
            isSaveNewsCardList={isSaveNewsCardList}
            handleDeleteNews={handleDeleteNews}
          ></ProtectedRoute>
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
