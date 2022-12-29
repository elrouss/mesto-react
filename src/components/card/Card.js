export default function Card({ card, handlePopup }) {
  return (
    <article className="gallery__item">
      <img src={card.data.link} alt={`Описание фотографии: ${card.data.name}`} className="gallery__item-image" onClick={() => handlePopup.onCardClick(card.data)} />
      <button type="button" aria-label="Удаление карточки" className="gallery__item-delete-button" onClick={handlePopup.onConfirmationCardDeletionPopup}></button>
      <h2 className="gallery__item-title">{card.data.name}</h2>
      <div className="gallery__item-likes">
        <button type="button" aria-label="Лайк карточки" className="gallery__item-like-button"></button>
        <span className="gallery__item-likes-counter">{card.data.likes.length}</span>
      </div>
    </article>
  );
}
