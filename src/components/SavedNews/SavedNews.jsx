import "./SavedNews.css";
import Header from "../Header/Header.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function SavedNews() {
  return (
    <section>
      <div className="save-news">
        <Header />
        <hr className="main__line"></hr>
        <SavedNewsHeader />
      </div>
      <NewsCardList />
    </section>
  );
}

export default SavedNews;
