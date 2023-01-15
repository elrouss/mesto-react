import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup(props) {
  const { isOpened, onClose, closePopupsOnOutsideClick } = props;

  return (
    <PopupWithForm
      popupData={{
        classSelector: "edit-profile",
        formName: "profileInfoEditor",
        title: "Редактировать профиль",
        submitBtn: "Сохранить",
      }}

      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    >
      <fieldset className="popup__form-fieldset">
        <input id="input-name" name="profileName" type="text" defaultValue="" placeholder="Имя" minLength="2" maxLength="40" required className="popup__form-field popup__form-field_type_profile-name" />
        <span className="popup__error input-name-error" />
        <input id="input-job" name="profileJob" type="text" defaultValue="" placeholder="О себе" minLength="2" maxLength="200" required className="popup__form-field popup__form-field_type_profile-job" />
        <span className="popup__error input-job-error" />
      </fieldset>
    </PopupWithForm>
  );
};
