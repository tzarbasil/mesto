import Popup from "./Popup.js"

export default class PopupConfirm extends Popup {
  constructor(popupSelector, card) {
    super(popupSelector);
    this._confirmSubmit = this._popup.querySelector(".popup__submit_confirmation");
    this.confirmSubmitText = this._confirmSubmit.textContent;
    this._card = card
  }

  setCallbackConfirm(callbackConfirm) {
    this._callbackConfirm = callbackConfirm;
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
      this._confirmSubmit.textContent = this.confirmSubmitText;
    }
  }
  setEventListeners() {
    super.setEventListeners()
    this._confirmSubmit.addEventListener('click', () => {
      this._callbackConfirm()
    });
  }

}