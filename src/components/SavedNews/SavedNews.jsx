import "./SavedNews.css";
import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import SaveNewsCardList from "../SaveNewsCardList/SaveNewsCardList.jsx";

function SavedNews(props) {
  return (
    <section>
      <div className="save-news">
        <Header mainTheme={props.mainTheme} onClickAuth={props.onClickAuth} loggedIn={props.loggedIn} signOut={props.signOut} />
        <hr className="main__line"></hr>
        <SavedNewsHeader />
      </div>
      <SaveNewsCardList mainTheme = {props.mainTheme} saveArticles={props.saveArticles} isSaveNewsCardList={props.isSaveNewsCardList} handleDeleteNews={handleDeleteNews} />
    </section>
  );
}

export default SavedNews;
