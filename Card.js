class Card {
  constructor(data, templateSelector, openImagePopup) {

    this._openImagePopup = openImagePopup;
    this._title = data.title;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._template = this._getTemplate();

    this._cardContainer = this._template.querySelector(".card__container");
    this._cardImage = this._cardContainer.querySelector(".card__image");
    this._cardTitle = this._cardContainer.querySelector(".card__title");
    this._deleteButton = this._cardContainer.querySelector(".card__delete");
    this._likeButton = this._cardContainer.querySelector(".card__like");
    this._setEventListeners();
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


    this._likeButton.addEventListener('click', () => {
      this._likeCard()
    });

    this._cardImage.addEventListener('click', () => { this.openPopup() });

  }

  openPopup() {
    this._openImagePopup(this._title, this._link);
  }


  renderElements() {
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._title;
    return this._cardContainer;
  }
}

export default Card;
//Создайте класс Card, который создаёт карточку с текстом и ссылкой на изображение:
//принимает в конструктор её данные и селектор её template-элемента;
//содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;
//содержит приватные методы для каждого обработчика;
// содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки.