import "./SavedNews.css";
import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function SavedNews({mainTheme, onClickAuth}) {
  return (
    <section>
      <div className="save-news">
        <Header mainTheme = {mainTheme} onClickAuth={onClickAuth} />
        <hr className="main__line"></hr>
        <SavedNewsHeader />
      </div>
      <NewsCardList mainTheme = {mainTheme} />
    </section>
  );
}

export default SavedNews;
