export default function ImagePopup() {
  return (
    <div className="popup popup_type_image">
      <div className="popup__container-image">
        <img src="#" alt="" className="popup__image" />
        <h3 className="popup__image-caption"></h3>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" />
      </div>
    </div>
  )
}
