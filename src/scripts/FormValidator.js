class FormValidator {
  constructor(options, formElement) {
    // Форма
    this._formElement = formElement;
    // Выбор инпута
    this._inputSelector = options.inputSelector;
    // Добавление надписи спана
    this._inputErrorClass = options.inputErrorClass;
    //Нижнее подчёркивание
    this._inputPopupClass = options.inputPopupClass;
    // САБМИТ
    this._submitSelector = options.submitSelector;
    // Выключенный сабмит
    this._disabledButtonClass = options.disabledButtonClass;
  }

  _settingInputs(input) {
    this._errorElement = input.parentNode.querySelector('.popup__form-input-error')
    if (input.validity.valid) {
      this._errorElement.textContent = '';
      input.classList.remove(this._inputPopupClass);
      this._errorElement.classList.remove(this._inputErrorClass);
    } else {
      input.classList.add(this._inputPopupClass);
      this._errorElement.textContent = input.validationMessage;
      this._errorElement.classList.add(this._inputErrorClass);
    }
  }

  toggleButtonState(value = false) {
    if (value) {
      this._buttonSubmit.disabled = true;
      this._buttonSubmit.classList.add(this._disabledButtonClass);
    } else {
      this._buttonSubmit.disabled = false;
      this._buttonSubmit.classList.remove(this._disabledButtonClass);
    }
  };


  _setEventListeners() {
    this._buttonSubmit = this._formElement.querySelector(this._submitSelector);
    this._inputsAll = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._inputsAll.forEach((input) => {
      input.addEventListener('input', () => {
        this._settingInputs(input);
        this.toggleButtonState(false);
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  };
}

export default FormValidator