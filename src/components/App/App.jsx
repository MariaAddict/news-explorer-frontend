import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const [mainTheme, setMainTheme] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);

  
  useEffect(() => {
    if (location.pathname === "/") {
      console.log("MAIN ", location.pathname);
      setMainTheme(true);
    }
    if (location.pathname === "/saved-news") {
      console.log("SAVEEE ", location.pathname);
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

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main mainTheme={mainTheme} onClickAuth = {handleLoginClick} isLoginModalOpen={isLoginModalOpen} isRegisterModalOpen={isRegisterModalOpen} />
        </Route>
        <Route path="/saved-news">
          <SavedNews mainTheme={mainTheme} onClickAuth = {handleLoginClick} />
        </Route>
      </Switch>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeAllPopups} openRegistrationModal={handleRegistrationClick} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeAllPopups} openLoginModal={handleLoginClick} />
      <InfoTooltip isOpen={infoTooltipOpen} onClose={closeAllPopups} openLoginModal={handleLoginClick}/>
    </div>
  );
}

export default App;
