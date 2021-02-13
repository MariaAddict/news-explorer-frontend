import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";

//временное решение
import cardOne from "../../images/card-1.png";
import cardTwo from "../../images/card-2.png";
import cardThree from "../../images/card-3.png";
const cards = [
  {
    keyword: "Природа",
    title: "Национальное достояние – парки",
    text:
      "В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.",
    date: "2 августа, 2019",
    source: "Лента.ру",
    link: "#",
    image: cardOne,
  },
  {
    keyword: "Природа",
    title: "Лесные огоньки: история одной фотографии",
    text:
      "Фотограф отвлеклась от освещения суровой политической реальности Мексики, чтобы запечатлеть ускользающую красоту одного из местных чудес природы.",
    date: "2 августа, 2019",
    source: "Медуза",
    link: "#",
    image: cardTwo,
  },
  {
    keyword: "Природа",
    title: "«Первозданная тайга»: новый фотопроект Игоря Шпиленка",
    text:
      "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...",
    date: "2 августа, 2019",
    source: "Риа",
    link: "#",
    image: cardThree,
  },
];
//

function NewsCardList() {
  return (
    <section className="card-list">
      <h3 className="card-list__title">Результаты поиска</h3>
      <ul className="cards">
        {cards.map((card) => (
          <NewsCard card={card} />
        ))}
      </ul>
      <button type="button" className="card-list__button">Показать еще</button>
    </section>
  );
}

export default NewsCardList;
