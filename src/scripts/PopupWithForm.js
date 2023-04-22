import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form')
        this._inputs = this._popup.querySelectorAll('.popup__input')
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
            this._submitForm(this._getInputValues())
            this.close()
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}
