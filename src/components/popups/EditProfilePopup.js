export default function EditProfilePopup() {
  return (
    <div className="popup popup_type_edit-profile">
      <div className="popup__container">
        <h3 className="popup__title">Редактировать профиль</h3>
        <form name="profileInfoEditor" className="popup__form popup__form_type_profile" noValidate>
          <fieldset className="popup__form-fieldset">
            <input id="input-name" name="profileName" type="text" value="Имя" placeholder="Имя" minLength="2" maxLength="40" required className="popup__form-field popup__form-field_type_profile-name" />
            <span className="popup__error input-name-error" />
            <input id="input-job" name="profileJob" type="text" value="О себе" placeholder="О себе" minLength="2" maxLength="200" required className="popup__form-field popup__form-field_type_profile-job" />
            <span className="popup__error input-job-error" />
          </fieldset>
          <button type="submit" className="popup__submit-button">Сохранить</button>
        </form>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" />
      </div>
    </div>
  )
}
