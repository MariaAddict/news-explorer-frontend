import "./SavedNewsHeader.css";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function SavedNewsHeader({saveArticles}) {

  const user = React.useContext(CurrentUserContext);

    const keywords = saveArticles.map((articles) =>  articles.keyword).reduce((prevVal, word) => {
      if (!prevVal[word]) {
        prevVal[word] = 1;
      } else {
        prevVal[word] += 1;
      }
      console.log('prevVal',prevVal)
      return prevVal;
    }, {}); 

    const result = Object.keys(keywords).sort((a,b) => {
      return keywords[b] - keywords[a];
    }).map((el) => (el.slice(0, 1).toUpperCase() + el.slice(1)));

  return (
    <section className="saved-news-header">
      <h3 className="saved-news-header__title">Сохранённые статьи</h3>
      <p className="saved-news-header__info">
        {user.name}, у вас {saveArticles.length} сохранённых статей
      </p>
      <p className="saved-news-header__keywords">
        По ключевым словам:&ensp;
        <span className="saved-news-header__keywords-span">
          {(result.length <= 3) ? `${result.join(', ')}` : `${result.slice(0,2).join(', ')} и ${result.length-2}-м другим`}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
