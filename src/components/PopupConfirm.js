import Popup from "./Popup.js"

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitForm, card) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._confirmSubmit = this._popup.querySelector(".popup__submit_confirmation");
    this.confirmSubmit = this._confirmSubmit.textContent;
    this._card = card
  }

  open(cardId, card) {
    super.open();
    this.cardId = cardId;
    this.card = card;
  }

  close() {
    super.close();
  }

  addSavingText(saving, text) {
    if (saving) {
      this._confirmSubmit.textContent = text;
    } else {
      this._confirmSubmit.textContent = this.confirmSubmit;
    }
  }
  setEventListeners() {
    this._confirmSubmit.addEventListener("click", this._submitForm);
}

}