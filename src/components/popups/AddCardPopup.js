export default function AddCardPopup() {
  return (
    <div className="popup popup_type_add-photocard">
      <div className="popup__container">
        <h3 className="popup__title">Новое место</h3>
        <form name="photocardAdding" className="popup__form popup__form_type_photocards" noValidate>
          <fieldset className="popup__form-fieldset">
            <input id="photocard-name" name="photocardName" type="text" placeholder="Название" value="" minLength="1" maxLength="30" required className="popup__form-field popup__form-field_type_add-photocard-name" />
            <span className="popup__error photocard-name-error" />
            <input id="photocard-url" name="photocardLink" type="url" placeholder="Ссылка на изображение" value="" required className="popup__form-field popup__form-field_type_add-photocard-link" />
            <span className="popup__error photocard-url-error" />
          </fieldset>
          <button type="submit" className="popup__submit-button">Создать</button>
        </form>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" />
      </div>
    </div>
  )
}
