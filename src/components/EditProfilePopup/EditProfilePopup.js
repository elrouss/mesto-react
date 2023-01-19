import { useState, useEffect, useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup(props) {
  const { onUpdateUser, isOpened, onClose, closePopupsOnOutsideClick, isProcessLoading } = props;

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const userNameLength = name && name.length;
  const userDescriptionLength = description && description.length;

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  };

  function isInputValueValid(value) {
    return value >= 2;
  };

  function isEditProfilePopupValid() {
    return isInputValueValid(userNameLength) && isInputValueValid(userDescriptionLength);
  };

  function showErrorMessage(inputValue) {
    if (inputValue >= 1 && inputValue < 2) {
      return `Текст должен быть не короче 2 симв. Длина текста сейчас: ${inputValue} символ.`
    };

    return 'Заполните это поле.';
  };

  return (
    <PopupWithForm
      popupData={{
        classSelector: "edit-profile",
        classSelectorModifierForm: "popup__form_type_profile",
        formName: "profileInfoEditor",
        title: "Редактировать профиль",
        submitBtn: "Сохранить",
        isPopupValid: isEditProfilePopupValid()
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      isProcessLoading={isProcessLoading}
    >
      <fieldset className="popup__form-fieldset">
        <input id="input-name" name="profileName" type="text" value={name || ''} onChange={handleChangeName} placeholder="Имя" maxLength="40" required className={`popup__form-field ${!isInputValueValid(userNameLength) && 'popup__form-field_type_error'} popup__form-field_type_profile-name`} />
        <span className={`popup__error ${!isInputValueValid(userNameLength) && 'popup__error_visible'} input-name-error`}>
          {showErrorMessage(userNameLength)}
        </span>
        <input id="input-job" name="profileJob" type="text" value={description || ''} onChange={handleChangeDescription} placeholder="О себе" maxLength="200" required className={`popup__form-field ${!isInputValueValid(userDescriptionLength) && 'popup__form-field_type_error'} popup__form-field_type_profile-job`} />
        <span className={`popup__error ${!isInputValueValid(userDescriptionLength) && 'popup__error_visible'} input-job-error`}>
          {showErrorMessage(userDescriptionLength)}
        </span>
      </fieldset>
    </PopupWithForm>
  );
};
