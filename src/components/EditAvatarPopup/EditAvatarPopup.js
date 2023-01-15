import { useState, useEffect, useContext, useRef } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
  const { onUpdateAvatar, isOpened, onClose, closePopupsOnOutsideClick } = props;

  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef(avatar);

  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });

    evt.target.reset();
  };

  return (
    <PopupWithForm
      popupData={{
        classSelector: "edit-avatar",
        formName: "profileAvatarEditor",
        title: "Обновить аватар",
        submitBtn: "Сохранить"
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    >
      <fieldset className="popup__form-fieldset">
        <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" defaultValue="" required className="popup__form-field popup__form-field_type_edit-avatar-link" ref={avatarRef} />
        <span className="popup__error avatar-url-error" />
      </fieldset>
    </PopupWithForm>
  );
};
