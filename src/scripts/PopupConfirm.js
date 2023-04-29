import Popup from "./Popup.js"

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._confirmSubmit = this._popup.querySelector(".popup__submit_confirmation");
    this.confirmSubmit = this._confirmSubmit.textContent;
  }

  open(cardId, card) {
    super.open();
    this.cardId = cardId;
    this.card = card;
    this._confirmSubmit.addEventListener("click", this._submitForm);
  }

  close() {
    super.close();
    this._confirmSubmit.removeEventListener("click", this._submitForm);
  }

  addSavingText(saving, text) {
    if (saving) {
      this._confirmSubmit.textContent = text;
    } else {
      this._confirmSubmit.textContent = this.confirmSubmit;
    }
  }

}