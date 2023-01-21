import { useState, useEffect, useContext, useRef } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
  const { onUpdateAvatar, isOpened, popupPackProps } = props;

  const currentUser = useContext(CurrentUserContext);

  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef(avatar);

  useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value.trim()
    });
  };

  useEffect(() => {
    if (isOpened) {
      avatarRef.current.value = '';
    };
  }, [isOpened, avatarRef]);

  return (
    <PopupWithForm
      popupData={{
        classSelector: "edit-avatar",
        classSelectorModifierForm: "popup__form_type_avatar",
        formName: "profileAvatarEditor",
        title: "Обновить аватар",
        submitBtn: "Сохранить"
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      popupPackProps={popupPackProps}
    >
      <fieldset className="popup__form-fieldset">
        <input
          className={`popup__form-field popup__form-field_type_edit-avatar-link`}
          name="userAvatar"
          type="url"
          placeholder="Ссылка на изображение"
          defaultValue=""
          required
          ref={avatarRef}
        />
      </fieldset>
    </PopupWithForm>
  );
};
