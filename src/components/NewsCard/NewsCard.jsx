import "./NewsCard.css";
import { useState } from 'react';

function NewsCard({ card, mainTheme}) {
    const [saveIsClick, setSaveIsClick] = useState(false);
  
    function handleSaveClick() {
        saveIsClick ? setSaveIsClick(false) : setSaveIsClick(true);
    }

  return (
    <li className="cards__item">
      <a href={card.link} className="cards__link">
        <img
          src={card.image}
          alt={card.title}
          className="cards__image"
        />
        <div className="cards__description">
          <div className="cards__description-no-source">
          <p className="cards__date">{card.date}</p>
          <h4 className="cards__title">{card.title}</h4>
          <p className="cards__text">{card.text}</p>
          </div>
          <p className="cards__source">{card.source}</p>
        </div>
        <button
          type="button"
          className={`cards__button-save ${mainTheme ? "cards__button-save_theme_main" : "cards__button-save_theme_save-news"}`}
          onClick={handleSaveClick}
        ></button>
        <button
        type="button" className={`cards__button-no-save ${saveIsClick ? "" :"cards__button-no-save_hidden" }`} >
           {/* onClick={handleSaveClick} */}
           { mainTheme ? "Войдите, чтобы сохранять статьи" : "Убрать из сохранённых" }</button>
        {!mainTheme && (<div className="cards__keyword"><p className="cards__keyword-text">{card.keyword}</p></div>)}
      </a>
    </li>
  );
}

export default NewsCard;
