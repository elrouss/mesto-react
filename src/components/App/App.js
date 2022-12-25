import React from 'react';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />

      <PopupWithForm popup={{ classSelector: "edit-profile", formName: "profileInfoEditor", title: "Редактировать профиль", submitBtn: "Сохранить" }}>
        <fieldset className="popup__form-fieldset">
          <input id="input-name" name="profileName" type="text" value="Имя" placeholder="Имя" minLength="2" maxLength="40" required className="popup__form-field popup__form-field_type_profile-name" />
          <span className="popup__error input-name-error" />
          <input id="input-job" name="profileJob" type="text" value="О себе" placeholder="О себе" minLength="2" maxLength="200" required className="popup__form-field popup__form-field_type_profile-job" />
          <span className="popup__error input-job-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{ classSelector: "edit-avatar", formName: "profileAvatarEditor", title: "Обновить аватар", submitBtn: "Сохранить" }}>
        <fieldset className="popup__form-fieldset">
          <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" value="" required className="popup__form-field popup__form-field_type_edit-avatar-link" />
          <span className="popup__error avatar-url-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{ classSelector: "add-photocard", formName: "photocardAdding", title: "Новое место", submitBtn: "Создать" }}>
        <fieldset className="popup__form-fieldset">
          <input id="photocard-name" name="photocardName" type="text" placeholder="Название" value="" minLength="1" maxLength="30" required className="popup__form-field popup__form-field_type_add-photocard-name" />
          <span className="popup__error photocard-name-error" />
          <input id="photocard-url" name="photocardLink" type="url" placeholder="Ссылка на изображение" value="" required className="popup__form-field popup__form-field_type_add-photocard-link" />
          <span className="popup__error photocard-url-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm popup={{ classSelector: "confirmation-deletion", formName: "photocardConfirmationDeletion", title: "Вы уверены?", submitBtn: "Да" }} />
    </>
  );
}
