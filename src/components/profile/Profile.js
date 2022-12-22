import ProfileAvatar from "./ProfileAvatar.js";
import ProfileInfo from "./ProfileInfo.js";

export default function Profile() {
  return (
    <section className="profile">
      <ProfileAvatar />
      <ProfileInfo />
      <button type="button" aria-label="Добавление карточек в галерею" className="profile__add-button" onClick={handleAddPlaceClick}/>
    </section>
  );
}

function handleAddPlaceClick() {
  const popup = document.querySelector('.popup_type_add-photocard');
  popup.classList.add('popup_opened');
}
