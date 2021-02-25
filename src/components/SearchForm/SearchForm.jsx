import './SearchForm.css';
import { useState, useCallback, useRef } from 'react';

function SearchForm() {
    const [word, setWord] = useState('');
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const inputRef = useRef();

    function handleChange(e) {
        setWord(e.target.value);
    }

    const resetFormWithoutWord = useCallback(
        (newErrors = {}, newIsValid = false) => {
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [ setErrors, setIsValid]
    );

    function handleSubmit(e) {
        e.preventDefault();
        setIsValid(e.target.closest(".seach-form").checkValidity());
        setErrors({ ...errors, [inputRef.current.name]: inputRef.current.validationMessage });
        // resetFormWithoutWord();
    }

    return (
        <form className="seach-form" action="#" name="seach-form" onSubmit={handleSubmit} noValidate>
            <input type="text" ref={inputRef} value={word} name="search" className="seach-form__input" placeholder="Введите тему новости"
             onChange={handleChange} minLength="1" required ></input>
            <button type="submit" className="seach-form__button" onChange={handleSubmit}>Искать</button>
            <span className={`seach-form__error ${(!errors.search && isValid) ? "" : "seach-form__error_visible"}`}>{errors.search ? "Нужно ввести ключевое слово" : ""}</span>
        </form>
    );
}

export default SearchForm;
