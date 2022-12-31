export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${Object.keys(props.card).length !== 0 && 'popup_opened'}`} onClick={props.closePopupsOnOutsideClick}>
      <div className="popup__container-image">
        <img src={props.card.link} alt={`Описание фотографии: ${props.card.name}`} className="popup__image" />
        <h3 className="popup__image-caption">{props.card.name}</h3>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" onClick={props.onClose} />
      </div>
    </div>
  );
}
