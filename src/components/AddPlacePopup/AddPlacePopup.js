import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup(props) {
  const { isOpened, onClose, closePopupsOnOutsideClick } = props;

  return (
    <PopupWithForm
      popupData={{
        classSelector: "add-photocard",
        formName: "photocardAdding",
        title: "Новое место",
        submitBtn: "Создать"
      }}

      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    >
      <fieldset className="popup__form-fieldset">
        <input id="photocard-name" name="photocardName" type="text" placeholder="Название" defaultValue="" minLength="1" maxLength="30" required className="popup__form-field popup__form-field_type_add-photocard-name" />
        <span className="popup__error photocard-name-error" />
        <input id="photocard-url" name="photocardLink" type="url" placeholder="Ссылка на изображение" defaultValue="" required className="popup__form-field popup__form-field_type_add-photocard-link" />
        <span className="popup__error photocard-url-error" />
      </fieldset>
    </PopupWithForm>
  );
};
