import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup(props) {
  const { onAddPlace, isOpened, onClose, closePopupsOnOutsideClick } = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNewCardName(evt) {
    setName(evt.target.value);
  };

  function handleNewCardLink(evt) {
    setLink(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
    
    setName('');
    setLink('');
  };

  return (
    <PopupWithForm
      popupData={{
        classSelector: "add-photocard",
        formName: "photocardAdding",
        title: "Новое место",
        submitBtn: "Создать"
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    >
      <fieldset className="popup__form-fieldset">
        <input id="photocard-name" name="photocardName" type="text" placeholder="Название" value={name || ''} onChange={handleNewCardName} minLength="1" maxLength="30" required className="popup__form-field popup__form-field_type_add-photocard-name" />
        <span className="popup__error photocard-name-error" />
        <input id="photocard-url" name="photocardLink" type="url" placeholder="Ссылка на изображение" value={link || ''} onChange={handleNewCardLink} required className="popup__form-field popup__form-field_type_add-photocard-link" />
        <span className="popup__error photocard-url-error" />
      </fieldset>
    </PopupWithForm>
  );
};
