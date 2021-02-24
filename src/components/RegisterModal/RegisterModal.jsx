import '../PopupWithForm/PopupWithForm.css';
import { useState, useCallback} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

function RegisterModal({ isOpen, onClose, openLoginModal }) {
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: e.target.validationMessage });
        setIsValid(e.target.closest(".modal__form").checkValidity());
    }

    const resetForm = useCallback(
        (newData = {email: '', password: '', name: ''},
        newErrors = {},
        newIsValid = false) => {
            setData(newData);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setData, setErrors, setIsValid]
    );

    function handleSubmit(e) {
        e.preventDefault();
        resetForm();
    }

    function handleLoginClick() {
        onClose();
        openLoginModal();
    }

    return (
        <PopupWithForm name='registration' title='Регистрация' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <p className= "modal__name-input">Email</p>
            <input type="email" name="email" className="modal__input modal__input_type_email"
                    placeholder="Введите почту" value={data.email} onChange={handleChange} minLength="1" required />
            <span className={`modal__error ${!errors.email ? "" : "modal__error_visible"}`} id="label-error">{errors.email}</span>
            <p className= "modal__name-input">Пароль</p>
            <input type="password" name="password" className="modal__input modal__input_type_password"
                    placeholder="Введите пароль"  value={data.password} onChange={handleChange} minLength="8" required  />
            <span className={`modal__error ${!errors.password ? "" : "modal__error_visible"}`}id="activity-error">{errors.password}</span>
            <p className= "modal__name-input">Имя</p>
            <input type="text" name="name" className="modal__input modal__input_type_password"
                    placeholder="Введите свое имя"  value={data.name} onChange={handleChange} minLength="1" required  />
            <span className={`modal__error ${!errors.name ? "" : "modal__error_visible"}`} id="activity-error">{errors.name}</span>
            <button type="submit" className={`modal__save-button ${isValid ? "" : "modal__save-button_disabled"}`} disabled={!isValid} ><span className="modal__name-button">Зарегистрироваться</span></button>
            <p className="modal__reg-name">или <span type="button" className="modal__req-link" onClick={handleLoginClick}>Войти</span></p>
        </PopupWithForm>
    );
}

export default RegisterModal;