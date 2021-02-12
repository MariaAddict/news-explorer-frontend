import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation({isClick}) {
  return (
      <nav className={isClick ? "navigation navigation_type_mobile" :"navigation navigation_type_desktop"}>
            <NavLink
              path
              to="/"
              className="navigation__link"
              activeClassName={isClick ? "" : "navigation__link_active"}
            >
              Главная
            </NavLink>
            <NavLink
              to="/saved-news"
              className="navigation__link"
              activeClassName={isClick ? "" : "navigation__link_active"}
            >
              Сохранённые&nbsp;статьи
            </NavLink>
          <button type="button" className="navigation__button">
            Авторизоваться
          </button>
      </nav>
  );
}

export default Navigation;
