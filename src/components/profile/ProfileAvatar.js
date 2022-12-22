export default function ProfileAvatar() {
  return (
    <div className="profile__container-avatar">
        <img src="#" alt="Аватар пользователя" className="profile__avatar" onClick={handleEditAvatarClick}/>
    </div>
  )
}

function handleEditAvatarClick() {
  const popup = document.querySelector('.popup_type_edit-avatar');
  popup.classList.add('popup_opened');
}
