class FormValidator {
  constructor(options, formElement) {
    // Форма 
    this._formElement = formElement;
    // Выбор инпута 
    this._labelSelector = options.labelSelector;
    this._inputSelector = options.inputSelector;
    // Добавление надписи спана 
    this._inputErrorClass = options.inputErrorClass;
    this._inputErrorClassActive = options.inputErrorClassActive;
    //Нижнее подчёркивание 

    this._inputPopupClass = options.inputPopupClass;
    // САБМИТ 
    this._submitSelector = options.submitSelector;
    // Выключенный сабмит 
    this._disabledButtonClass = options.disabledButtonClass;

    this._inputsAll = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _settingInputs(input) {
    this._errorElement = input.closest(this._labelSelector).querySelector(this._inputErrorClass);
    if (input.validity.valid) {
      this._errorElement.textContent = '';
      input.classList.remove(this._inputPopupClass);
      this._errorElement.classList.remove(this._inputErrorClassActive);
    } else {
      input.classList.add(this._inputPopupClass);
      this._errorElement.textContent = input.validationMessage;
      this._errorElement.classList.add(this._inputErrorClassActive);
    }
  }

  toggleButtonState() {
    const isValid = this._inputsAll.every(input => input.validity.valid);
    if (isValid) {
      this._buttonSubmit.disabled = false;
      this._buttonSubmit.classList.remove(this._disabledButtonClass);
    } else {
      this._buttonSubmit.disabled = true;
      this._buttonSubmit.classList.add(this._disabledButtonClass);
    }
  }


  _setEventListeners() {
    this._buttonSubmit = this._formElement.querySelector(this._submitSelector);
    this._labelsAll = Array.from(this._formElement.querySelectorAll(this._labelSelector));
    this._labelsAll.forEach((label) => {
      const input = label.querySelector('input')
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