import "./Navigation.css";
import React from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import imgLogoutMain  from "../../images/logout-main.png";
import imgLogoutNews  from "../../images/logout-news.png";

function Navigation({
  isClick,
  mainTheme,
  onClickAuth,
  closeBurger,
  loggedIn,
  signOut
}) {
  const user = React.useContext(CurrentUserContext);

  function handleUnAuthButton() {
    onClickAuth();
    closeBurger();
  }

  function handleAuthButton() {
    signOut();
    closeBurger();
  }

  return (
    <nav
      className={
        isClick
          ? "navigation navigation_type_mobile"
          : "navigation navigation_type_desktop"
      }
    >
      <NavLink
        exact
        to="/"
        className={`navigation__link ${
          mainTheme
            ? "navigation__link_theme_main"
            : "navigation__link_theme_save-news"
        } ${isClick ? "navigation__link_theme_burger" : ""}`}
        activeClassName={isClick ? "" : "navigation__link_active-main"}
      >
        Главная
      </NavLink>
      {loggedIn && (
        <NavLink
          to="/saved-news"
          className={`navigation__link ${
            mainTheme
              ? "navigation__link_theme_main"
              : "navigation__link_theme_save-news"
          } ${isClick ? "navigation__link_theme_burger" : ""}`}
          activeClassName={isClick ? "" : "navigation__link_active-save-news"}
        >
          Сохранённые&nbsp;статьи
        </NavLink>
      )}
      <div
        // type="button"
        className={`navigation__button ${
          mainTheme
            ? "navigation__button_theme_main"
            : "navigation__button_theme_save-news"
        } ${isClick ? "navigation__button_theme_burger" : ""} `}
        onClick={loggedIn ? handleAuthButton : handleUnAuthButton}
      >
        {loggedIn ? (
          <div className="navigation__button-logout">
            <p className="navigation__button-name">{user.name}</p>
            <img
              src={mainTheme ? imgLogoutMain : imgLogoutNews}
              alt="Выйти"
              className={`navigation__logout ${
                mainTheme
                  ? "navigation__logout_theme_main"
                  : "navigation__logout_theme_save-news"
              }`}
            ></img>
          </div>
        ) : (
          <p className="navigation__button-name">Авторизоваться</p>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
