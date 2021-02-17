import '../PopupWithForm/PopupWithForm.css';
import { useState} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

function RegisterModal({ isOpen, onClose, openLoginModal }) {
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    });

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleLoginClick() {
        onClose();
        openLoginModal();
    }

    return (
        <PopupWithForm name='registration' title='Регистрация' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <p className= "modal__name-input">Email</p>
            <input type="email" name="email" className="modal__input modal__input_type_email"
                    placeholder="Введите почту" value={data.email} onChange={handleChange} required />
            <span className="modal__error modal__error_visible" id="label-error"></span>
            <p className= "modal__name-input">Пароль</p>
            <input type="password" name="password" className="modal__input modal__input_type_password"
                    placeholder="Введите пароль"  value={data.password} onChange={handleChange} required  />
            <span className="modal__error modal__error_visible" id="activity-error"></span>
            <p className= "modal__name-input">Имя</p>
            <input type="text" name="name" className="modal__input modal__input_type_password"
                    placeholder="Введите свое имя"  value={data.name} onChange={handleChange} required  />
            <span className="modal__error modal__error_visible" id="activity-error"></span>
            <button type="submit" className="modal__save-button"><span className="modal__name-button">Зарегистрироваться</span></button>
            <p className="modal__reg-name">или <span type="button" className="modal__req-link" onClick={handleLoginClick}>Войти</span></p>
        </PopupWithForm>
    );
}

export default RegisterModal;