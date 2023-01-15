import React, { useState, useEffect, useCallback } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from '../../utils/api.js';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
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


  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе редактировании информации пользователя: ${err}`);
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((cardLike) => {
        setCards(cards.map(c => c._id === card._id ? cardLike : c));
      })
      .catch((err) => {
        console.log(`Ошибка в процессе добавления/снятия лайка карточки в галерее: ${err}`);
      })
  };

  function handleCardDelete(card) {
    api.deleteСard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка в процессе удаления карточки из галереи: ${err}`);
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
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpened={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />

        <EditAvatarPopup
          isOpened={isEditAvatarPopupOpened}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />

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

        {/* <PopupWithForm
        popupData={{
          classSelector: "confirmation-deletion",
          formName: "photocardConfirmationDeletion",
          title: "Вы уверены?",
          submitBtn: "Да"
        }}

        isOpened={isConfirmationCardDeletionPopupOpened}
        onClose={closeAllPopups}
        closePopupsOnOutsideClick={closePopupsOnOutsideClick}
      /> */}
        {/* TODO: Перенести логику удаления карточки в окно подтверждения удаления карточки */}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />
      </CurrentUserContext.Provider>
    </>
  );
};
