import "./App.css";
import { Route, Switch, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import { useEffect, useState } from "react";


function App() {
  const location = useLocation();
  const [mainTheme, setMainTheme] = useState(true);
  useEffect(() => {
    if (location.pathname === "/") {
      console.log('MAIN ', location.pathname);
      setMainTheme(true);
    }
    if (location.pathname === "/saved-news") {
      console.log('SAVEEE ', location.pathname);
      setMainTheme(false);
    }
  }, [location]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main mainTheme = {mainTheme} />
        </Route>
        <Route path="/saved-news">
          <SavedNews mainTheme = {mainTheme} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
