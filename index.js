//Попапы
const popup = document.querySelector('.popup');
const popupPlace = document.querySelector('.popup_type_place_edit');
const popupImage = document.querySelector('.popup__card-image');
const cardImagePopup = document.querySelector('.popup_type_card');
//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__button');

const cardSubtitle = document.querySelector('.popup__card-subtitle');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_subtitle');

function openPopup(popup) { popup.classList.add('popup_opened') }
function closePopup(popup) { popup.classList.remove('popup_opened') }


editButton.addEventListener('click', function () {
  openPopup(popup)
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
});

closeButton.forEach(function (closeButton) {
  closeButton.addEventListener('click', function () {
    closePopup(popup);
    closePopup(popupPlace);
    closePopup(cardImagePopup);
  });
})

addButton.addEventListener('click', function () {
  openPopup(popupPlace);
});



function handleFormSubmit(evt) {
  closePopup(popup);
  evt.preventDefault();


  const name = evt.target.querySelector('.popup__input_type_name').value
  const subtitle = evt.target.querySelector('.popup__input_type_subtitle').value
  
  const profileTitle = document.querySelector('.profile__title');
  const profileSubitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = name;
  profileSubitle.textContent = subtitle;
}

formElement.addEventListener('submit', handleFormSubmit);

function createCard(cardText, src) {

  const cardTemplate = document.querySelector('#card__template').content
  const cardContainer = cardTemplate.querySelector('.card__container').cloneNode(true);
  const cardImg = cardContainer.querySelector('.card__image')
  const cardTitle = cardContainer.querySelector('.card__title')
  const cardLikeButton = cardContainer.querySelector('.card__like')
  const cardDeleteButton = cardContainer.querySelectorAll('.card__delete');

  cardImg.setAttribute('src', src);
  cardTitle.innerText = cardText;



  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like_active')
  })

  cardImg.addEventListener('click', function () {
    openPopup(cardImagePopup)
    popupImage.setAttribute('src', src);
    cardSubtitle.textContent = cardText;
  });


  function deleteCard(event) {
    const card = document.querySelector('section.card');
    card.removeChild(event.target.closest('article'));
  }

  cardDeleteButton.forEach(button => {
    button.addEventListener('click', deleteCard);
  })

  return cardContainer;
}

function renderCard(card) {
  const cardsBlock = document.querySelector('section.card');
  cardsBlock.prepend(createCard(card.cardText, card.src));
}

const cardsDefault = [
  { cardText: 'Карачаевск', src: './images/Karachaevsk.png' },
  { cardText: 'Домбай', src: './images/Dombay.png' },
  { cardText: 'Эльбрус', src: './images/Elbrus.png' },
  { cardText: 'Камчатка', src: './images/Kamchatka.png' },
  { cardText: 'Мурманск', src: './images/Murmansk.png' },
  { cardText: 'Териберка', src: './images/Teriberka.png' },
]
cardsDefault.forEach(function (element) {
  renderCard(element)
})

const placeForm = document.querySelector('.popup__form_place');

function getFormValue(event) {
  closePopup(popupPlace);
  event.preventDefault();

  const cardText = placeForm.querySelector('.popup-card-name');
  const src = placeForm.querySelector('.popup-card-secondname');

  const values = {
    cardText: cardText.value,
    src: src.value
  }
  createCard(renderCard(values));
}

placeForm.addEventListener('submit', getFormValue);



