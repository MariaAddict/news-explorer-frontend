import "./Main.css";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import About from "../About/About.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NotFoundArticles from "../NotFoundArticles/NotFoundArticles.jsx";

function Main({
  mainTheme,
  onClickAuth,
  isLoginModalOpen,
  isRegisterModalOpen,
  submitSearchForm,
  articles,
  loader,
  isNewsCardList,
  isNotFoundArticles,
  handleButtonCardListClick,
  numberOfArticles,
  errorApiNews
}) {
  return (
    <main>
      <div className="main">
        <Header
          mainTheme={mainTheme}
          onClickAuth={onClickAuth}
          isLoginModalOpen={isLoginModalOpen}
          isRegisterModalOpen={isRegisterModalOpen}
        />
        <hr className="main__line"></hr>
        <h2 className="main__title">Что творится в&nbsp;мире?</h2>
        <p className="main__subtitle">
          Находите самые свежие статьи на&nbsp;любую тему и&nbsp;сохраняйте
          в&nbsp;своём личном кабинете.
        </p>
        <SearchForm onSubmit={submitSearchForm} errorApiNews={errorApiNews} />
      </div>
      {isNewsCardList && (
        <NewsCardList mainTheme={mainTheme} articles={articles} onClick={handleButtonCardListClick} numberOfArticles={numberOfArticles} />
      )}
      {loader && <Preloader />}
      {isNotFoundArticles && <NotFoundArticles />}
      <About />
    </main>
  );
}

export default Main;
