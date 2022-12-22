export default function EditAvatarPopup() {
  return (
    <div className="popup popup_type_edit-avatar">
      <div className="popup__container">
        <h3 className="popup__title">Обновить аватар</h3>
        <form name="profileAvatarEditor" className="popup__form popup__form_type_avatar" noValidate>
          <fieldset className="popup__form-fieldset">
            <input id="avatar-url" name="profileAvatar" type="url" placeholder="Ссылка на изображение" value="" required className="popup__form-field popup__form-field_type_edit-avatar-link" />
            <span className="popup__error avatar-url-error" />
          </fieldset>
          <button type="submit" className="popup__submit-button">Сохранить</button>
        </form>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" />
      </div>
    </div>
  )
}
