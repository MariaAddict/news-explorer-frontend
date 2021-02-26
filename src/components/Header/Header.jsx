import "./Header.css";
import { useState } from "react";
import Navigation from "../Navigation/Navigation.jsx";

function Header({ mainTheme, onClickAuth, isLoginModalOpen, isRegisterModalOpen, loggedIn, signOut }) {
  const [isClick, setIsClick] = useState(false);

  function handleClickBurger() {
    isClick ? setIsClick(false) : setIsClick(true);
  }

  function closeBurger() {
    setIsClick(false);
  }

  return (
    <div className={isClick ? "ovelay" : ""}>
      <header
        className={`header ${isClick ? "header_active" : ""} ${
          mainTheme ? "header_theme_main" : "header_theme_save-news"
        } ${isClick ? "header_theme_burger" : ""}`}
      >
        <h1 className={`header__title ${(isLoginModalOpen || isRegisterModalOpen) ? "header__title_hidden" : ""}`}>NewsExplorer</h1>
        <hr className="header__line"></hr>
        <Navigation isClick={isClick} mainTheme={mainTheme} onClickAuth={onClickAuth} closeBurger={closeBurger} loggedIn={loggedIn} signOut={signOut} />
        <button
          type="button"
          className={`header__burger ${
            mainTheme
              ? "header__burger_theme_main"
              : "header__burger_theme_save-news"
          } ${isClick ? "header__burger_active" : ""} ${(isLoginModalOpen || isRegisterModalOpen) ? "header__burger_hidden" : ""}`}
          onClick={handleClickBurger}
        ></button>
      </header>
    </div>
  );
}

export default Header;
