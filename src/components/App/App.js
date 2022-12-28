import React, { useState, useRef, useCallback, useEffect } from 'react';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';

export default function App() {
  const [isEditProfilePopupOpened, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpened, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpened, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationCardDeletionPopupOpened, setConfirmationCardDeletionPopupOpened] = useState(false);

  function openEditProfilePopup() {
    setEditProfilePopupOpen(true);
  };

  function openAddPlacePopup() {
    setAddPlacePopupOpen(true);
  };

  function openEditAvatarPopup() {
    setEditAvatarPopupOpen(true);
  };

  function openConfirmationCardDeletionPopup() {
    setConfirmationCardDeletionPopupOpened(true);
  };

  function closeAllPopups() {
    isEditProfilePopupOpened && setEditProfilePopupOpen(false);
    isAddPlacePopupOpened && setAddPlacePopupOpen(false);
    isEditAvatarPopupOpened && setEditAvatarPopupOpen(false);
    isConfirmationCardDeletionPopupOpened && setConfirmationCardDeletionPopupOpened(false);
  };

  const popupEditProfileRef = useRef();
  const popupEditAvatarRef = useRef();
  const popupAddPlaceRef = useRef();
  const popupConfirmationCardDeletionRef = useRef();

  function closePopupOnOutsideClick(evt) {
    if (popupEditProfileRef.current === evt.target
      || popupAddPlaceRef.current === evt.target
      || popupEditAvatarRef.current === evt.target
      || popupConfirmationCardDeletionRef.current === evt.target) closeAllPopups();
  };

  const closePopupEditProfileOnKeyPressEsc = useCallback(
    evt => {
      if (evt.key === 'Escape' && isEditProfilePopupOpened) setEditProfilePopupOpen(false);
    },
    [isEditProfilePopupOpened, setEditProfilePopupOpen],
  );

  const closePopupAddPlaceOnKeyPressEsc = useCallback(
    evt => {
      if (evt.key === 'Escape' && isAddPlacePopupOpened) setAddPlacePopupOpen(false);
    },
    [isAddPlacePopupOpened, setAddPlacePopupOpen]
  );

  const closePopupEditAvatarOnKeyPressEsc = useCallback(
    evt => {
      if (evt.key === 'Escape' && isEditAvatarPopupOpened) setEditAvatarPopupOpen(false);
    },
    [isEditAvatarPopupOpened, setEditAvatarPopupOpen]
  );

  const closePopupConfirmationCardDeletionOnKeyPressEsc = useCallback(
    evt => {
      if (evt.key === 'Escape' && isConfirmationCardDeletionPopupOpened) setConfirmationCardDeletionPopupOpened(false);
    },
    [isConfirmationCardDeletionPopupOpened, setConfirmationCardDeletionPopupOpened]
  );

  useEffect(() => {
    document.addEventListener('keydown', closePopupEditProfileOnKeyPressEsc);
    document.addEventListener('keydown', closePopupAddPlaceOnKeyPressEsc);
    document.addEventListener('keydown', closePopupEditAvatarOnKeyPressEsc);
    document.addEventListener('keydown', closePopupConfirmationCardDeletionOnKeyPressEsc);

    return () => {
      document.removeEventListener('keydown', closePopupEditProfileOnKeyPressEsc);
      document.removeEventListener('keydown', closePopupAddPlaceOnKeyPressEsc);
      document.removeEventListener('keydown', closePopupEditAvatarOnKeyPressEsc);
      document.removeEventListener('keydown', closePopupConfirmationCardDeletionOnKeyPressEsc);
    };
  });

  return (
    <>
      <Header />
      <Main handlePopup={{ onEditProfile: openEditProfilePopup, onAddPlace: openAddPlacePopup, onEditAvatar: openEditAvatarPopup, onConfirmationCardDeletionPopup: openConfirmationCardDeletionPopup }} />
      <Footer />

      <PopupWithForm popup={{ classSelector: "edit-profile", formName: "profileInfoEditor", title: "Редактировать профиль", submitBtn: "Сохранить", isOpened: isEditProfilePopupOpened, onClose: closeAllPopups, ref: popupEditProfileRef, closePopupOnOutsideClick: closePopupOnOutsideClick }}>
        <fieldset className="popup__form-fieldset">
          <input id="input-name" name="profileName" type="text" value="Имя" placeholder="Имя" minLength="2" maxLength="40" required className="popup__form-field popup__form-field_type_profile-name" />
          <span className="popup__error input-name-error" />
          <input id="input-job" name="profileJob" type="text" value="О себе" placeholder="О себе" minLength="2" maxLength="200" required className="popup__form-field popup__form-field_type_profile-job" />
          <span className="popup__error input-job-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{ classSelector: "edit-avatar", formName: "profileAvatarEditor", title: "Обновить аватар", submitBtn: "Сохранить", isOpened: isEditAvatarPopupOpened, onClose: closeAllPopups, ref: popupEditAvatarRef, closePopupOnOutsideClick: closePopupOnOutsideClick }}>
        <fieldset className="popup__form-fieldset">
          <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" value="" required className="popup__form-field popup__form-field_type_edit-avatar-link" />
          <span className="popup__error avatar-url-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{ classSelector: "add-photocard", formName: "photocardAdding", title: "Новое место", submitBtn: "Создать", isOpened: isAddPlacePopupOpened, onClose: closeAllPopups, ref: popupAddPlaceRef, closePopupOnOutsideClick: closePopupOnOutsideClick }}>
        <fieldset className="popup__form-fieldset">
          <input id="photocard-name" name="photocardName" type="text" placeholder="Название" value="" minLength="1" maxLength="30" required className="popup__form-field popup__form-field_type_add-photocard-name" />
          <span className="popup__error photocard-name-error" />
          <input id="photocard-url" name="photocardLink" type="url" placeholder="Ссылка на изображение" value="" required className="popup__form-field popup__form-field_type_add-photocard-link" />
          <span className="popup__error photocard-url-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{ classSelector: "confirmation-deletion", formName: "photocardConfirmationDeletion", title: "Вы уверены?", submitBtn: "Да", isOpened: isConfirmationCardDeletionPopupOpened, onClose: closeAllPopups, ref: popupConfirmationCardDeletionRef, closePopupOnOutsideClick: closePopupOnOutsideClick }} />
    </>
  );
}
