import "./NewsCard.css";
import React, { useState } from "react";

function NewsCard({ card, mainTheme }) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    //timezone: 'UTC',
  };

  const date = new Date(card.publishedAt).toLocaleDateString("ru", options);
  const dateCard = (date.substr(0,date.length - 8) + "," + date.substr(date.length - 8)).slice(0, date.length - 2);

  const [saveIsClick, setSaveIsClick] = useState(false);

  function handleSaveClick() {
    saveIsClick ? setSaveIsClick(false) : setSaveIsClick(true);
  }

  return (
    <li className="cards__item">
      <a href={card.url} className="cards__link" target="_blank" rel="noopener noreferrer">
        <img src={card.urlToImage} alt={card.title} className="cards__image" />
        <div className="cards__description">
          <p className="cards__date">{dateCard}</p>
          <h4 className="cards__title">{card.title}</h4>
          <p className="cards__text">{card.description}</p>
        </div>
        <p className="cards__source">{card.source.name}</p>
        <button
          type="button"
          className={`cards__button-save ${
            mainTheme
              ? "cards__button-save_theme_main"
              : "cards__button-save_theme_save-news"
          }`}
          onClick={handleSaveClick}
        ></button>
        <button
          type="button"
          className={`cards__button-no-save ${
            saveIsClick ? "" : "cards__button-no-save_hidden"
          }`}
        >
          {/* onClick={handleSaveClick} */}
          {mainTheme
            ? "Войдите, чтобы сохранять статьи"
            : "Убрать из сохранённых"}
        </button>
        {!mainTheme && (
          <div className="cards__keyword">
            <p className="cards__keyword-text">{card.keyword}</p>
          </div>
        )}
      </a>
    </li>
  );
}

export default NewsCard;
