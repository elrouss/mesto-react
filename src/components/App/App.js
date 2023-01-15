import { useState, useEffect, useCallback } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from '../../utils/api.js';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';

import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js';
import ImagePopup from '../ImagePopup/ImagePopup.js';
import ConfirmCardDeletionPopup from '../ConfirmCardDeletionPopup/ConfirmCardDeletionPopup.js';

export default function App() {
  const [isEditProfilePopupOpened, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpened, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpened, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmationCardDeletionPopupOpened, setConfirmationCardDeletionPopupOpened] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [activeCardId, setActiveCardId] = useState('');

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

  function openConfirmationCardDeletionPopup(card) {
    setConfirmationCardDeletionPopupOpened(true);
    setActiveCardId(card._id);
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
        console.log(`Ошибка в процессе редактирования информации пользователя: ${err}`);
      })
  };

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data.avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе изменения аватара пользователя: ${err}`);
      })
  };

  function handleAddPlaceSubmit(data) {
    api.addNewСard(data.name, data.link)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в процессе добавления новой карточки в галерею: ${err}`);
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

  function handleCardDelete(activeCardId) {
    api.deleteСard(activeCardId)
      .then(() => {
        setCards(cards.filter(c => c._id !== activeCardId));
        closeAllPopups();
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
        />
      </CurrentUserContext.Provider>

      <Footer />

      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpened={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpened={isEditAvatarPopupOpened}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpened={isAddPlacePopupOpened}
          onClose={closeAllPopups}
          closePopupsOnOutsideClick={closePopupsOnOutsideClick}
        />

        <ConfirmCardDeletionPopup
          activeCardId={activeCardId}
          onCardDelete={handleCardDelete}
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
