import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup(props) {
  const { onAddPlace, isOpened, popupPackProps } = props;

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedLink, setIsFocusedLink] = useState(false);

  const newCardNameLength = name && name.length;

  function isNewCardLink(url) {
    const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

    return !!urlPattern.test(url);
  };

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
  };

  useEffect(() => {
    if (isOpened) {
      setName('');
      setLink('');
    };
  }, [isOpened]);

  function isInputValueValid(value) {
    return value >= 1;
  };

  function isAddPlacePopupValid() {
    return isInputValueValid(newCardNameLength) && isNewCardLink(link);
  };

  return (
    <PopupWithForm
      popupData={{
        classSelector: "add-photocard",
        classSelectorModifierForm: "popup__form_type_photocards",
        formName: "photocardAdding",
        title: "Новое место",
        submitBtn: "Создать",
        isPopupValid: isAddPlacePopupValid()
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      popupPackProps={popupPackProps}
    >
      <fieldset className="popup__form-fieldset">
        <input id="photocard-name" name="photocardName" type="text" placeholder="Название" value={name} onChange={handleNewCardName} maxLength="30" required className={`popup__form-field ${(isFocusedName && !isInputValueValid(newCardNameLength)) && 'popup__form-field_type_error'} popup__form-field_type_add-photocard-name`} onFocus={() => setIsFocusedName(true)} onBlur={() => setIsFocusedName(false)} />
        <span className={`popup__error ${(isFocusedName && !isInputValueValid(newCardNameLength)) && 'popup__error_visible'} photocard-name-error`}>
          Заполните это поле.
        </span>
        <input id="photocard-url" name="photocardLink" type="url" placeholder="Ссылка на изображение" value={link} onChange={handleNewCardLink} required className={`popup__form-field ${((isFocusedLink && !isNewCardLink(link)) || (!isNewCardLink(link) && link !== '')) && 'popup__form-field_type_error'} popup__form-field_type_add-photocard-link`} onFocus={() => setIsFocusedLink(true)} onBlur={() => setIsFocusedLink(false)} />
        <span className={`popup__error ${((isFocusedLink && !isNewCardLink(link)) || (!isNewCardLink(link) && link !== '')) && 'popup__error_visible'} photocard-url-error`}>
          Введите URL.
        </span>
      </fieldset>
    </PopupWithForm>
  );
};
