import "./NotFoundArticles.css";
import imageNotFound from "../../images/not-found.png"

function NotFoundArticles() {
  return (
    <section className="not-found">
      <img className="not-found__image" src={imageNotFound} alt="Не найдено"></img>
      <h3 className="not-found__title">Ничего не найдено</h3>
      <p className="not-found__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
    </section>
  );
}

export default NotFoundArticles;