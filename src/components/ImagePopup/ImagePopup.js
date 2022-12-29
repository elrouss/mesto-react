export default function ImagePopup({ popup }) {
  return (
    <div className={`popup popup_type_image ${Object.keys(popup.card).length !== 0 && 'popup_opened'}`} ref={popup.ref} onClick={popup.closePopupOnOutsideClick}>
      <div className="popup__container-image">
        <img src={popup.card.link} alt={`Описание фотографии: ${popup.card.name}`} className="popup__image" />
        <h3 className="popup__image-caption">{popup.card.name}</h3>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" onClick={popup.onClose} />
      </div>
    </div>
  );
}
