import React, { useState, useEffect, useCallback } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from '../../utils/api.js';

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

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getPhotocards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи карточек: ${err}`);
      })
  }, []);

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

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  };

  const closeAllPopups = useCallback(() => {
    isEditProfilePopupOpened && setEditProfilePopupOpen(false);
    isAddPlacePopupOpened && setAddPlacePopupOpen(false);
    isEditAvatarPopupOpened && setEditAvatarPopupOpen(false);
    isConfirmationCardDeletionPopupOpened && setConfirmationCardDeletionPopupOpened(false);

    selectedCard && setSelectedCard({});
  }, [isEditProfilePopupOpened, isAddPlacePopupOpened, isEditAvatarPopupOpened, isConfirmationCardDeletionPopupOpened, selectedCard]);

  const closePopupsOnOutsideClick = useCallback((evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__closing-button')) {
      closeAllPopups();
    };
  }, [closeAllPopups]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка в процессе добавления/снятия лайка карточки: ${err}`);
      })
  };

return (
  <>
    <Header />

    <CurrentUserContext.Provider value={currentUser}>
      <Main
        onEditProfile={openEditProfilePopup}
        onAddPlace={openAddPlacePopup}
        onEditAvatar={openEditAvatarPopup}
        onConfirmationCardDeletion={openConfirmationCardDeletionPopup}
        onCardClick={handleCardClick}

        cards={cards}
        onCardLike={handleCardLike}
      />
      <Footer />

      <PopupWithForm
        popupData={{
          classSelector: "edit-profile",
          formName: "profileInfoEditor",
          title: "Редактировать профиль",
          submitBtn: "Сохранить",
        }}

        isOpened={isEditProfilePopupOpened}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      >
        <fieldset className="popup__form-fieldset">
          <input id="input-name" name="profileName" type="text" defaultValue="" placeholder="Имя" minLength="2" maxLength="40" required className="popup__form-field popup__form-field_type_profile-name" />
          <span className="popup__error input-name-error" />
          <input id="input-job" name="profileJob" type="text" defaultValue="" placeholder="О себе" minLength="2" maxLength="200" required className="popup__form-field popup__form-field_type_profile-job" />
          <span className="popup__error input-job-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        popupData={{
          classSelector: "edit-avatar",
          formName: "profileAvatarEditor",
          title: "Обновить аватар",
          submitBtn: "Сохранить"
        }}

        isOpened={isEditAvatarPopupOpened}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      >
        <fieldset className="popup__form-fieldset">
          <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" defaultValue="" required className="popup__form-field popup__form-field_type_edit-avatar-link" />
          <span className="popup__error avatar-url-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        popupData={{
          classSelector: "add-photocard",
          formName: "photocardAdding",
          title: "Новое место",
          submitBtn: "Создать"
        }}

        isOpened={isAddPlacePopupOpened}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      >
        <fieldset className="popup__form-fieldset">
          <input id="photocard-name" name="photocardName" type="text" placeholder="Название" defaultValue="" minLength="1" maxLength="30" required className="popup__form-field popup__form-field_type_add-photocard-name" />
          <span className="popup__error photocard-name-error" />
          <input id="photocard-url" name="photocardLink" type="url" placeholder="Ссылка на изображение" defaultValue="" required className="popup__form-field popup__form-field_type_add-photocard-link" />
          <span className="popup__error photocard-url-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        popupData={{
          classSelector: "confirmation-deletion",
          formName: "photocardConfirmationDeletion",
          title: "Вы уверены?",
          submitBtn: "Да"
        }}

        isOpened={isConfirmationCardDeletionPopupOpened}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      />
    </CurrentUserContext.Provider>
  </>
);
};
