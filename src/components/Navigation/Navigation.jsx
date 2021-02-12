import "./Navigation.css";
import { NavLink  } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
        <NavLink path to="/" className="navigation__link" activeClassName="navigation__link_active">
          Главная
        </NavLink>
        <NavLink to="/saved-news" className="navigation__link" activeClassName="navigation__link_active" >
          Сохранённые&nbsp;статьи
        </NavLink>
        <button type="button" className="navigation__button">Авторизоваться</button>
    </nav>
  );
}

export default Navigation;
