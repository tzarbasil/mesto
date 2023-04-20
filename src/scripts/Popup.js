export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector
        this._closeButton = popupSelector.querySelector('.popup__close-button')
        this._popup = document.querySelector('.popup')
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
    }

    closepopup() {
        this._popupSelector.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.closepopup();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.currentTarget === evt.target) {
            this.closepopup()
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
            this.closepopup()
        })

        this._popup.addEventListener('click', (evt) => {
            this._handleOverlayClose(evt)
        })

        document.querySelectorAll('.popup').forEach((popup) => {
            popup.addEventListener('click', (evt) => {
                this._handleOverlayClose(evt)
            })
        })

        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        }
        )
    }
}
