import '../PopupWithForm/PopupWithForm.css';
import { useState} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

function LoginModal({ isOpen, onClose, openRegistrationModal }) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        // onLogin(data.password, data.email);
    }

    function handleRegistrationClick() {
        onClose();
        openRegistrationModal();
    }

    return (
        <PopupWithForm name='login' title='Вход' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <p className= "modal__name-input">Email</p>
            <input type="email" name="email" className="modal__input modal__input_type_email"
                    placeholder="Введите почту" value={data.email} onChange={handleChange}  />
            <span className="modal__error modal__error_visible" id="label-error"></span>
            <p className= "modal__name-input">Пароль</p>
            <input type="password" name="password" className="modal__input modal__input_type_password"
                    placeholder="Введите пароль"  value={data.password} onChange={handleChange}   />
            <span className="modal__error modal__error_visible" id="activity-error"></span>
            <button type="submit" className="modal__save-button"><span className="modal__name-button">Войти</span></button>
            <p className="modal__reg-name">или <span className="modal__req-link" onClick={handleRegistrationClick}>Зарегистрироваться</span></p>
        </PopupWithForm>
    );
}

export default LoginModal;