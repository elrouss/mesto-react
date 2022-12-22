import ProfileAvatar from "./ProfileAvatar.js";
import ProfileInfo from "./ProfileInfo.js";

export default function Profile() {
  return (
    <section className="profile">
      <ProfileAvatar />
      <ProfileInfo />
      <button type="button" aria-label="Кнопка добавления фотокарточек в галерею" className="profile__add-button" />
    </section>
  );
}
