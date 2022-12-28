import { useEffect, useState } from "react";
import { api } from "../../utils/api.js";
import Card from "../Card/Card.js";

export default function Main({ handlePopup }) {
  const [userName, setUserName] = useState([]);
  const [userDescription, setUserDescription] = useState([]);
  const [userAvatar, setUserAvatar] = useState([]);

  const [cards, renderCards] = useState([]);

  useEffect(() => {
    let mounted = true;

    Promise.all([api.getUserInfo(), api.getPhotocards()])
      .then(([user, cards]) => {
        if (mounted) {
          setUserName(user.name);
          setUserDescription(user.about);
          setUserAvatar(user.avatar);

          renderCards(cards);
        }
      })
      .catch((err) => {
        console.log(`Ошибка в процессе загрузки данных пользователя и галереи: ${err}`);
      })

    return () => {
      mounted = false;
    }
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" onClick={handlePopup.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
          <button type="button" aria-label="Редактирование информации в профиле" className="profile__edit-button" onClick={handlePopup.onEditProfile} />
        </div>
        <button type="button" aria-label="Добавление карточек в галерею" className="profile__add-button" onClick={handlePopup.onAddPlace} />
      </section>
      <section className="gallery" aria-label="Галерея карточек">
        {
          cards.map((card) => (
            <Card key={card._id} card={{ data: card }} handlePopup={handlePopup.onConfirmationCardDeletionPopup} />
          ))
        }
      </section>
    </main>
  );
}
