export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this._cardContainer = this._template.querySelector(".card__container");
    this._cardImage = this._cardContainer.querySelector(".card__image");
    this._cardTitle = this._cardContainer.querySelector(".card__title");
    this._deleteButton = this._cardContainer.querySelector(".card__delete");
    this._likeButton = this._cardContainer.querySelector(".card__like");
    this._setEventListeners();
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return cardTemplate;
  }

  _deleteCard() {
    this._cardContainer.remove();
  }

  _likeCard() {
    this._likeButton.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard()
    });

    this._likeButton.addEventListener('click', this._likeCard.bind(this));

    this._cardImage.addEventListener("click", () => {
      this._openPopupImage();
    });
  }

  _openPopupImage() {
    this._handleCardClick(this._title, this._link);
  }

  createElement() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._cardContainer;
  }
}
