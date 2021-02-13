import "./SavedNewsHeader.css";

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <h3 className="saved-news-header__title">Сохранённые статьи</h3>
      <p className="saved-news-header__info">
        Грета, у вас 5 сохранённых статей
      </p>
      <p className="saved-news-header__keywords">
        По ключевым словам:&ensp;
        <span className="saved-news-header__keywords-span">
          Природа, Тайга и 2-м другим
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
