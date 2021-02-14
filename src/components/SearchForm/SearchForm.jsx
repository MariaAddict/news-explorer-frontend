import './SearchForm.css';
import { useState } from 'react';

function SearchForm() {
    const [word, setWord] = useState('');

    function handleChange(e) {
        setWord(word);
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="seach-form">
            <input type="text" name="seach-word" className="seach-form__input" placeholder="Введите тему новости" onChange={handleChange} required ></input>
            <button type="submit" className="seach-form__button" onChange={handleSubmit}>Искать</button>
        </div>
    );
}

export default SearchForm;
