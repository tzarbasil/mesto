const hiddenError = (errorElement, inputSelector, inputErrorClass, inputPopupClass) => {
    errorElement.innerText = '';
    errorElement.classList.remove(inputErrorClass)
    inputSelector.classList.remove(inputPopupClass)
}

const showError = (errorElement, inputSelector, message, inputErrorClass, inputPopupClass) => {
    errorElement.innerText = message;
    errorElement.classList.add(inputErrorClass)
    inputSelector.classList.add(inputPopupClass)
}

const toggleInputState = (inputElement, options) => {
    const isValid = inputElement.validity.valid

    const inputSectionElement = inputElement.closest(options.inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(options.inputErrorSelector)
    const inputSelector = inputSectionElement.querySelector(options.inputSelector)

    if (isValid) {
        hiddenError(errorElement, inputSelector, options.inputErrorClass, options.inputPopupClass)
    } else {
        showError(errorElement, inputSelector, inputElement.validationMessage, options.inputErrorClass, options.inputPopupClass)
    }
}

const enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(disabledButtonClass)
}

const disableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.setAttribute('disabled', 'true')
    buttonElement.classList.add(disabledButtonClass)
}

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid)

    if (formIsValid) {
        enableButton(submitElement, disabledButtonClass)
    } else {
        disableButton(submitElement, disabledButtonClass)
    }
}

const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector)
    const inputs = Array.from(form.querySelectorAll(options.inputSelector))

    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            toggleInputState(inputElement, options)
            toggleButtonState(inputs, submitElement, options.disabledButtonClass)
        })
    })
    toggleButtonState(inputs, submitElement, options.disabledButtonClass)
}

const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach(form => {
        setEventListeners(form, options);
    });
};