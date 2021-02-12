import "./Header.css";
import { useState } from 'react';
import Navigation from "../Navigation/Navigation.jsx";

function Header() {
    const [isClick, setIsClick] = useState(false);

  function handleClickBurger() {
    isClick ? setIsClick(false) : setIsClick(true);
  }

  return (
    <div className={isClick ? "ovelay" : ""}>
    <header className={isClick ? "header header_active" : "header" }>
      <h1 className="header__title">NewsExplorer</h1>
      <hr className="header__line"></hr>
        <Navigation isClick = {isClick} />
      <div className={isClick ? "header__burger header__burger_active" : "header__burger"} onClick={handleClickBurger}></div>
    </header>
    </div>
  );
}

export default Header;
