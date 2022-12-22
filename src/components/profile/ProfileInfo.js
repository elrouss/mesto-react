export default function ProfileInfo() {
 return (
  <div className="profile__info">
    <h1 className="profile__name">Жак-Ив Кусто</h1>
    <p className="profile__job">Исследователь океана</p>
    <button type="button" aria-label="Редактирование информации в профиле" className="profile__edit-button" onClick={handleEditProfileClick}/>
  </div>
 )
}

function handleEditProfileClick() {
  const popup = document.querySelector('.popup_type_edit-profile');
  popup.classList.add('popup_opened');
}
