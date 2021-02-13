import './Main.css';
import Header from '../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import About from '../About/About.jsx';
import NewsCardList from '../NewsCardList/NewsCardList.jsx';

function Main() {
    return (
        <div>
        <div className="main">
            <Header />
            <hr className="main__line"></hr>
            <h2 className="main__title">Что творится в&nbsp;мире?</h2>
            <p className="main__subtitle">Находите самые свежие статьи на&nbsp;любую тему и&nbsp;сохраняйте в&nbsp;своём личном кабинете.</p>
            <SearchForm />
        </div>
        <NewsCardList />
        <About />
        </div>  
    );
}

export default Main;