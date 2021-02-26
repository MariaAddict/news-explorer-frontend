import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function NewsCardList({mainTheme, articles, onClick, numberOfArticles, loggedIn, handleSaveNews}) {
  return (
    <section className={`card-list ${mainTheme ? "card-list_theme_main" : "card-list_theme_save-news"}`}>
      {mainTheme && (<h3 className="card-list__title">Результаты поиска</h3>)}
      <ul className="cards">
        {articles.map((card, i) => {
          card.index = i;
          return (
          <NewsCard key={i} card={card} mainTheme = {mainTheme} loggedIn={loggedIn} handleSaveNews={handleSaveNews}/>
        )}).slice(0, numberOfArticles)}
      </ul>
      {(numberOfArticles < articles.length) && mainTheme && (<button type="button" className="card-list__button" onClick={onClick}>Показать еще</button>)}
    </section>
  );
}

export default NewsCardList;
