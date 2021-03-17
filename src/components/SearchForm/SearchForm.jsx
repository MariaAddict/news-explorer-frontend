import "./SearchForm.css";
import { useState, useCallback, useRef } from "react";

function SearchForm({ onSubmit, errorApiNews, keyword, isLocalStorageData }) {
  const [word, setWord] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef();

  function handleChange(e) {
    if (isLocalStorageData) {
      setWord(keyword);
    }
    setWord(e.target.value);
    setIsValid(e.target.closest(".seach-form").checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsValid(e.target.closest(".seach-form").checkValidity());
    setErrors({
      ...errors,
      [inputRef.current.name]: inputRef.current.validationMessage,
    });
    if (isValid) {
      onSubmit(word);
    }
  }

  return (
    <form
      className="seach-form"
      action="#"
      name="seach-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="text"
        ref={inputRef}
        value={ word }
        name="search"
        className="seach-form__input"
        placeholder="Введите тему новости"
        onChange={handleChange}
        minLength="1"
        required
      ></input>
      <button
        type="submit"
        className="seach-form__button"
        onChange={handleSubmit}
      >Искать</button>
      <span
        className={`seach-form__error ${
          (!errors.search && isValid) || !errorApiNews
            ? ""
            : "seach-form__error_visible"
        }`}
      >
        {errors.search
          ? "Нужно ввести ключевое слово"
          : (errorApiNews
          ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          : "")}
      </span>
    </form>
  );
}

export default SearchForm;
