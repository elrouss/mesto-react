export default function Main() {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container-avatar">
          <img src="#" alt="Аватар пользователя" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <p className="profile__job">Исследователь океана</p>
          <button type="button" aria-label="Редактирование информации в профиле" className="profile__edit-button" />
        </div>
        <button type="button" aria-label="Добавление карточек в галерею" className="profile__add-button" />
      </section>
      <section className="gallery" aria-label="Галерея карточек"></section>
    </main>
  );
}
