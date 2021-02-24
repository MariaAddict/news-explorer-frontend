import './SearchForm.css';
import { useState, useCallback } from 'react';

function SearchForm() {
    const [word, setWord] = useState('');
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        setWord(e.target.value);
        setErrors({ ...errors, [e.target.name]: e.target.validationMessage });
        setIsValid(e.target.closest(".seach-form").checkValidity());
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
        resetFormWithoutWord();
    }

    return (
        <form className="seach-form" action="#" name="seach-form" onSubmit={handleSubmit} noValidate>
            <input type="text" value={word} name="search" className="seach-form__input" placeholder="Введите тему новости"
             onChange={handleChange} minLength="1" required ></input>
            <button type="submit" className="seach-form__button" onChange={handleSubmit} disabled={!isValid}>Искать</button>
            <span className={`seach-form__error ${!errors.search ? "" : "seach-form__error_visible"}`}>{errors.search}</span>
        </form>
    );
}

export default SearchForm;
