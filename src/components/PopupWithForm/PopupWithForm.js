export default function PopupWithForm({ popup, children }) {
  return (
    <div className={`popup popup_type_${popup.classSelector}`}>
      <div className="popup__container">
        <h3 className="popup__title">{popup.title}</h3>
        <form name={popup.formName} className="popup__form popup__form_type_profile" noValidate>
          {children}
          <button type="submit" className="popup__submit-button">{popup.submitBtn}</button>
        </form>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" />
      </div>
    </div>
  );
}
