import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function ConfirmCardDeletionPopup(props) {
  const { activeCardId, onCardDelete, isOpened, onClose, closePopupsOnOutsideClick } = props;

  function handleSubmit(evt) {
    evt.preventDefault();

    onCardDelete(activeCardId);
  }

  return (
    <PopupWithForm
      popupData={{
        classSelector: "confirmation-deletion",
        formName: "photocardConfirmationDeletion",
        title: "Вы уверены?",
        submitBtn: "Да"
      }}

      onSubmit={handleSubmit}
      isOpened={isOpened}
      onClose={onClose}
      closePopupsOnOutsideClick={closePopupsOnOutsideClick}
    />
  );
};
