import "./Footer.css";
import { Link } from "react-router-dom";
import iconGitHub from "../../images/git.png";
import iconFacebook from "../../images/facebook.png";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; 2020 Supersite, Powered by News API
      </p>
      <div className="footer__navigation">
        <nav>
          <ul className="footer__links">
            <li className="footer__list">
              <Link to="/" className="footer__link">
                Главная
              </Link>
            </li>
            <li className="footer__list">
              <a
                href="https://praktikum.yandex.ru/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="footer__icons">
            <li className="footer__list">
              <a
                href="https://www.facebook.com/"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={iconFacebook}
                  alt="Facebook"
                  className="footer__icon"
                ></img>
              </a>
            </li>
            <li className="footer__list">
              <a
                href="https://github.com/MariaAddict/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__icon"
              >
                <img
                  src={iconGitHub}
                  alt="GitHub"
                  className="footer__icon"
                ></img>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
