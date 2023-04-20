import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._submitForm = submitForm;
        this._form = this._popupSelector.querySelector('.popup__form')
        this._inputs = this._popup.querySelectorAll('.popup__input')
    }

    getInputValues() {
        let temp = []
        this._inputs.forEach(item => temp.push(item.value))
        this._inputValues = temp;
        return this._inputValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
            this._submitForm(this.getInputValues())
        })
    }
}
