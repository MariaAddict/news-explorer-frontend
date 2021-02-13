import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({ isClick, mainTheme }) {
  return (
    <nav
      className={
        isClick
          ? "navigation navigation_type_mobile"
          : "navigation navigation_type_desktop"
      }
    >
      <NavLink
        path
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
      <button
        type="button"
        className={`navigation__button ${
          mainTheme
            ? "navigation__button_theme_main"
            : "navigation__button_theme_save-news"
        } ${isClick ? "navigation__button_theme_burger" : ""} `}
      >
        Авторизоваться
      </button>
    </nav>
  );
}

export default Navigation;
