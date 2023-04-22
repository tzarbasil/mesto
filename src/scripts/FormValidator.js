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
  } 
//  Проверять лейбл
  _settingLabels(label) { 
    const input = label.querySelector(this._inputSelector)
    const errorElement = label.querySelector(this._inputErrorClass)
    const isValid = input.validity.valid 
    if (isValid) { 
      input.classList.remove(this._inputPopupClass); 
      errorElement.textContent = ''; 
      errorElement.classList.remove(this._inputErrorClassActive); 
    } else { 
      input.classList.add(this._inputPopupClass); 
      errorElement.textContent = input.validationMessage; 
      errorElement.classList.add(this._inputErrorClassActive); 
    } 
  } 
 
  toggleButtonState(isValid = false) { 
    if (isValid) { 
      this._buttonSubmit.disabled = true; 
      this._buttonSubmit.classList.add(this._disabledButtonClass); 
    } else { 
      this._buttonSubmit.disabled = false; 
      this._buttonSubmit.classList.remove(this._disabledButtonClass); 
    } 
  }; 
 
 
  _setEventListeners() { 
    this._buttonSubmit = this._formElement.querySelector(this._submitSelector); 
    this._labelsAll = Array.from(this._formElement.querySelectorAll(this._labelSelector)); 
    this._labelsAll.forEach((label) => { 
      const input = label.querySelector('input')
      input.addEventListener('input', () => { 
        this._settingLabels(label); 
        this.toggleButtonState(false); 
      }) 
    }) 
  } 
 
  enableValidation() { 
    this._setEventListeners(); 
  }; 
} 
 
export default FormValidator 