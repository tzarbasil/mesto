export default class Card {
  constructor(data, templateSelector, handleCardClick, handleTrashClick, userId, getLike, deleteLike) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();
    this._cardContainer = this._template.querySelector(".card__container");
    this._cardImage = this._cardContainer.querySelector(".card__image");
    this._cardTitle = this._cardContainer.querySelector(".card__title");
    this._deleteButton = this._cardContainer.querySelector(".card__delete");
    this._likeButton = this._cardContainer.querySelector(".card__like");
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;

    this._owner = data.owner;
    // this._deleteCard = deleteCard;
    this._userId = userId;
    this._cardId = data._id;
    this._setEventListeners();

    this._likesSelector = data.likes;
    this._getLike = getLike;
    this._deleteLike = deleteLike;
    this._likeCounter = this._cardContainer.querySelector(".card__like_counter");
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleTrashClick();
        });

    this._likeButton.addEventListener("click", () => {
      this.setLikeSettings(this);
    });
    this._cardImage.addEventListener("click", () => {
      this._openPopupImage();
    });
  }

  getId() {
    return this._cardId;
  }

  removeCard(){
    this._cardContainer.remove();
  }

  setLikeSettings() {
    if (this._likeButton.classList.contains("card__like_active")) {
      this._deleteLike(this);
    } else {
      this._getLike(this);
    }
  }

  clickCardLike(data) {
    this._likeButton.classList.toggle("card__like_active");
    this._likeCounter.textContent = data.likes.length;
  }

  _openPopupImage() {
    this._handleCardClick(this._title, this._link);
  }

  createElement() {
    if (this._userId !== this._owner._id) {
      this._deleteButton.style.display = "none";
    }

    this._likesSelector.forEach((_cardContainer) => {
      if (this._userId === _cardContainer._id) {
        this._likeButton.classList.add("card__like_active");
      }
    });
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._cardContainer;
  }
}
