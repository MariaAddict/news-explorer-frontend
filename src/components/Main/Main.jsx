import './Main.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import About from '../About/About.jsx';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';
import Preloader from '../Preloader/Preloader.jsx';

function Main( {mainTheme, onClickAuth, isLoginModalOpen, isRegisterModalOpen} ) {
    return (
        <main>
        <div className="main">
            <Header mainTheme = {mainTheme} onClickAuth = {onClickAuth} isLoginModalOpen={isLoginModalOpen} isRegisterModalOpen={isRegisterModalOpen} />
            <hr className="main__line"></hr>
            <h2 className="main__title">Что творится в&nbsp;мире?</h2>
            <p className="main__subtitle">Находите самые свежие статьи на&nbsp;любую тему и&nbsp;сохраняйте в&nbsp;своём личном кабинете.</p>
            <SearchForm />
        </div>
        <NewsCardList mainTheme = {mainTheme}  />
        {/* <Preloader /> */}
        <About />
        </main>  
    );
}

export default Main;