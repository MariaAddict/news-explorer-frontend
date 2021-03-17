import "./SavedNews.css";
import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function SavedNews(props) {
  return (
    <section>
      <div className="save-news">
        <Header mainTheme={props.mainTheme} onClickAuth={props.onClickAuth} loggedIn={props.loggedIn} signOut={props.signOut} />
        <hr className="main__line"></hr>
        <SavedNewsHeader saveArticles={props.saveArticles} />
      </div>
      <NewsCardList mainTheme = {props.mainTheme} articles={props.saveArticles} isSaveNewsCardList={props.isSaveNewsCardList} handleDeleteNews={props.handleDeleteNews} />
    </section>
  );
}

export default SavedNews;
