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

function App() {
  const location = useLocation();
  const [mainTheme, setMainTheme] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [articles, setArticles] = useState([]);


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

  function handleInfoTooltipClick() {
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setInfoTooltipOpen(false);
  }

  function submitSearchForm(word) {
    apiNews.getNews(word).then(data => {
      setArticles(data.articles);
    }
    ).catch(err => {
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
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeAllPopups}
        openLoginModal={handleLoginClick}
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
