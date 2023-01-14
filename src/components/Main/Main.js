import React from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Card from "../Card/Card.js";

export default function Main(props) {
  const currentUserInfo = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img src={currentUserInfo.avatar} alt="Аватар пользователя" className="profile__avatar" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserInfo.name}</h1>
          <p className="profile__job">{currentUserInfo.about}</p>
          <button type="button" aria-label="Редактирование информации в профиле" className="profile__edit-button" onClick={props.onEditProfile} />
        </div>
        <button type="button" aria-label="Добавление карточек в галерею" className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      <section className="gallery" aria-label="Галерея карточек">
        {
          props.cards.map((card) => (
            <Card key={card._id} card={card} handlePopup={props} />
          ))
        }
      </section>
    </main>
  );
}
