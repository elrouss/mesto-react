import { useState, useEffect, useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditProfilePopup(props) {
  const { onUpdateUser, isOpened, onClose, closePopupsOnOutsideClick } = props;

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

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

  return (
    <PopupWithForm
      popupData={{
        classSelector: "edit-profile",
        formName: "profileInfoEditor",
        title: "Редактировать профиль",
        submitBtn: "Сохранить",
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    >
      <fieldset className="popup__form-fieldset">
        <input id="input-name" name="profileName" type="text" value={name || ''} onChange={handleChangeName} placeholder="Имя" minLength="2" maxLength="40" required className="popup__form-field popup__form-field_type_profile-name" />
        <span className="popup__error input-name-error" />
        <input id="input-job" name="profileJob" type="text" value={description || ''} onChange={handleChangeDescription} placeholder="О себе" minLength="2" maxLength="200" required className="popup__form-field popup__form-field_type_profile-job" />
        <span className="popup__error input-job-error" />
      </fieldset>
    </PopupWithForm>
  );
};
