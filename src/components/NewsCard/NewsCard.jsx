import "./NewsCard.css";
import { useState } from 'react';

function NewsCard({ card }) {
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
          // onClick={handleClick}
        />
        <div className="cards__description">
          <p className="cards__date">{card.date}</p>
          <h4 className="cards__title">{card.title}</h4>
          <p className="cards__text">{card.text}</p>
          <p className="cards__source">{card.source}</p>
        </div>
        <button
          type="button"
          className={"cards__button-save"}
          onClick={handleSaveClick}
        ></button>
        <button
        type="button" className={`cards__button-no-save ${saveIsClick ? "" :"cards__button-no-save_hidden" }`} >
          
           {/* onClick={handleSaveClick} */}
           Войдите, чтобы сохранять статьи</button>
        {/* <div className="cards__keyword"><p className="cards__keyword-text">{card.keyword}</p></div> */}
      </a>
    </li>
  );
}

export default NewsCard;
