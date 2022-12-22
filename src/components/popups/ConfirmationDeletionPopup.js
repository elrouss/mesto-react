export default function ConfirmationDeletionPopup() {
  return (
    <div className="popup popup_type_confirmation-deletion">
      <div className="popup__container">
        <h3 className="popup__title">Вы уверены?</h3>
        <form name="photocardConfirmationDeletion" className="popup__form popup__form_type_confirmation-deletion" noValidate>
          <button type="submit" className="popup__submit-button popup__submit-button_type_confirmation-deletion">Да</button>
        </form>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" />
      </div>
    </div>
  )
}
