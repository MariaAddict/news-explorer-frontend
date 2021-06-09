import "../PopupWithForm/PopupWithForm.css"
function InfoTooltip({isOpen, onClose, openLoginModal}) {

    function handleLoginClick() {
        onClose();
        openLoginModal();
    }

    return (
        <div className={`modal modal_type_info-tooltip ${isOpen ? ('modal_opened') : ('')}`}>
            <div className="modal__container modal__container_type_info-tooltip">
                <h4 className="modal__res-registration">Пользователь успешно зарегистрирован!</h4>
                <p className="modal__reg-name"><span type="button" className="modal__req-link" onClick={handleLoginClick}>Войти</span></p>
                <button type="button" className="modal__close-button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;