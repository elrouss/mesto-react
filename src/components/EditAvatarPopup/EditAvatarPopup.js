import { useState, useEffect, useContext, useRef } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup(props) {
  const { onUpdateAvatar, isOpened, popupPackProps } = props;

  const currentUser = useContext(CurrentUserContext);

  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef(avatar);

  const [link, setLink] = useState('');
  const [isFocusedLink, setIsFocusedLink] = useState(false);

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
      setLink('');
      avatarRef.current.value = '';
    };
  }, [isOpened, avatarRef]);

  function handleNewAvatarLink(evt) {
    setLink(evt.target.value);
  };

  function isNewAvatarLink(url) {
    const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

    return !!urlPattern.test(url);
  };

  function isEditAvatarPopupValid() {
    return isNewAvatarLink(link);
  };

  return (
    <PopupWithForm
      popupData={{
        classSelector: "edit-avatar",
        classSelectorModifierForm: "popup__form_type_avatar",
        formName: "profileAvatarEditor",
        title: "Обновить аватар",
        submitBtn: "Сохранить",
        isPopupValid: isEditAvatarPopupValid()
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      popupPackProps={popupPackProps}
    >
      <fieldset className="popup__form-fieldset">
        <input
          className={`popup__form-field ${((!isNewAvatarLink(link) && link !== '') || isFocusedLink) && 'popup__form-field_type_error'} popup__form-field_type_edit-avatar-link`}
          name="userAvatar"
          type="url"
          placeholder="Ссылка на изображение"
          defaultValue=""
          required
          ref={avatarRef}
          onChange={(evt) => handleNewAvatarLink(evt)}
          onFocus={() => setIsFocusedLink(true)}
          onBlur={() => setIsFocusedLink(false)}
        />
        {(link !== '' || isFocusedLink) && <span className={`popup__error ${!isNewAvatarLink(link) && 'popup__error_visible'} avatar-url-error`}>
          Введите URL.
        </span>}
      </fieldset>
    </PopupWithForm>
  );
};
