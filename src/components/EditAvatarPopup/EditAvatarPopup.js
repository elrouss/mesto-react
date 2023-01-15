import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
  const { isOpened, onClose, closePopupsOnOutsideClick } = props;

  return (
    <PopupWithForm
      popupData={{
        classSelector: "edit-avatar",
        formName: "profileAvatarEditor",
        title: "Обновить аватар",
        submitBtn: "Сохранить"
      }}

      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    >
      <fieldset className="popup__form-fieldset">
        <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" defaultValue="" required className="popup__form-field popup__form-field_type_edit-avatar-link" />
        <span className="popup__error avatar-url-error" />
      </fieldset>
    </PopupWithForm>
  );
};
