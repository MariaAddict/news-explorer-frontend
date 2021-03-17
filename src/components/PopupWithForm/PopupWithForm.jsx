import "./PopupWithForm.css";

function PopupWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.name} ${
        props.isOpen ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container">
        <h3 className="modal__title">{props.title}</h3>
        <form
          action="#"
          name="modal-form"
          className={`modal__form modal__container_type_${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
        </form>
        <button
          type="button"
          className="modal__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
