import { useContext } from 'react';

import { ProcessLoadingSpinnerContext } from '../../contexts/ProcessLoadingSpinnerContext';
import useClosePopupsOnKeyPressEsc from '../../hooks/useClosePopupsOnKeyPressEsc';

export default function PopupWithForm({ popupData, ...props }) {
  const isProcessLoading = useContext(ProcessLoadingSpinnerContext);

  useClosePopupsOnKeyPressEsc(props.isOpened, props.onClose);

  function handleBtnText() {
    if (!isProcessLoading) {
      return popupData.submitBtn;
    };

    return popupData.submitBtnLoading ? popupData.submitBtnLoading : 'Сохранение...';
  };

  return (
    <div className={`popup popup_type_${popupData.classSelector} ${props.isOpened && 'popup_opened'}`} onClick={props.closePopupsOnOutsideClick}>
      <div className="popup__container">
        <h3 className="popup__title">{popupData.title}</h3>
        <form name={popupData.formName} className={`popup__form ${popupData.classSelectorModifierForm}`} noValidate onSubmit={props.onSubmit} >
          {props.children}
          <button type="submit" className={`popup__submit-button ${popupData.classSelectorModifierSubmitBtn}`}>
            {handleBtnText()}
          </button>
        </form>
        <button type="button" aria-label="Закрытие модального окна" className="popup__closing-button" onClick={props.onClose} />
      </div>
    </div>
  );
};
