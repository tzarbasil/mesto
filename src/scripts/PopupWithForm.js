import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = this._form.querySelectorAll('.popup__input')
        this._submitButton = this._form.querySelector(".popup__submit");
        this._submitButtonTextcontent = this._submitButton.textContent;
    }

    _getInputValues() {
        const inputValues = {};
        this._inputs.forEach(input => inputValues[input.getAttribute('name')] = input.value);
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues());
            this.close()
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    
    addSavingText(saving, text) {
        if (saving) {
            this._submitButton.textContent = text;
        } else {
            this._submitButton.textContent = this._submitButtonTextcontent;
        }
    }
}
