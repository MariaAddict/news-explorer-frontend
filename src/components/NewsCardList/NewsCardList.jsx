import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList({mainTheme, articles}) {
  return (
    <section className={`card-list ${mainTheme ? "card-list_theme_main" : "card-list_theme_save-news"}`}>
      {mainTheme && (<h3 className="card-list__title">Результаты поиска</h3>)}
      <ul className="cards">
        {articles.map((card, i) => (
          <NewsCard key={i} card={card} mainTheme = {mainTheme}/>
        ))}
      </ul>
      {mainTheme && (<button type="button" className="card-list__button">Показать еще</button>)}
    </section>
  );
}

export default NewsCardList;
