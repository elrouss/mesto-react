export default function Card() {
  return (
    <template className="gallery-template">
      <article className="gallery__item">
        <img src="#" alt="" className="gallery__item-image" />
        <button type="button" aria-label="Удаление карточки" className="gallery__item-delete-button"></button>
        <h2 className="gallery__item-title"></h2>
        <div className="gallery__item-likes">
          <button type="button" aria-label="Лайк карточки" className="gallery__item-like-button"></button>
          <span className="gallery__item-likes-counter"></span>
        </div>
      </article>
    </template>
  )
}
