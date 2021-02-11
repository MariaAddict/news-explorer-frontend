import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Main from '../Main/Main.jsx';
import SavedNews from '../SavedNews/SavedNews.jsx';

  function App() {
    return (
      <div className="App">
        {/* <div className="page"> */}
          {/* <Header /> */}
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/saved-news">
            <h1>Saved news</h1>
            {/* <SavedNews /> */}
            </Route>
          </Switch>
          {/* <Footer /> */}
          
        {/* </div> */}
      </div>
    );
  }

export default App;
