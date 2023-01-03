export default function Card(props) {
  const { card, handlePopup } = props;

  return (
    <article className="gallery__item">
      <div className="gallery__item-image-container">
        <img src={props.card.link} alt={`Описание фотографии: ${card.name}`} className="gallery__item-image" onClick={() => handlePopup.onCardClick(card)} />
      </div>
      <button type="button" aria-label="Удаление карточки" className="gallery__item-delete-button" onClick={handlePopup.onConfirmationCardDeletion}></button>
      <h2 className="gallery__item-title">{card.name}</h2>
      <div className="gallery__item-likes">
        <button type="button" aria-label="Лайк карточки" className="gallery__item-like-button"></button>
        <span className="gallery__item-likes-counter">{card.likes.length}</span>
      </div>
    </article>
  );
}
