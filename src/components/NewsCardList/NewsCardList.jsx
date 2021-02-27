import "./NewsCardList.css";
import React from "react";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList(props) {
  return (
    <section className={`card-list ${props.mainTheme ? "card-list_theme_main" : "card-list_theme_save-news"}`}>
      <h3 className="card-list__title">Результаты поиска</h3>
      <ul className="cards">
        {props.articles.map((card, i) => {
          card.index = i;
          return (
          <NewsCard key={i} card={card} mainTheme = {props.mainTheme} loggedIn={props.loggedIn} handleSaveNews={props.handleSaveNews}/>
        )}).slice(0, props.numberOfArticles)}
      </ul>
      {(props.numberOfArticles <= props.articles.length) && (<button type="button" className="card-list__button" onClick={props.onClick}>Показать еще</button>)}
    </section>
  );

}

export default NewsCardList;
