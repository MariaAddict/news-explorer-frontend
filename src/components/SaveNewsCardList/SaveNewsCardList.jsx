import "../NewsCardList/NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

function SaveNewsCardList(props) {
    return (
      <section className={"card-list card-list_theme_save-news"}>
        <ul className="cards">
          { props.isSaveNewsCardList && props.saveArticles.map((card, i) => {
            card.index = i;
            return (
            <NewsCard key={i} card={card} mainTheme = {props.mainTheme} loggedIn={props.loggedIn} handleDeleteNews={props.handleDeleteNews} />
          )}).slice(0, props.saveArticles.length)
        }
        </ul>
      </section>
    );
  
  }
  
  export default SaveNewsCardList;