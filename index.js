const popup = document.querySelector('.popup__edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__button');
const popupPlace = document.querySelector('.popup__place');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
});

closeButton.forEach(function (cb) {
  cb.addEventListener('click', function () {
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup.classList.remove('popup_opened');
  });
})

const formElement = document.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_subtitle');

function handleFormSubmit(evt) {
  popup.classList.remove('popup_opened');
  evt.preventDefault();


  let name = evt.target.querySelector('.popup__input_type_name').value
  console.log(name)
  let subtitle = evt.target.querySelector('.popup__input_type_subtitle').value
  console.log(name)

  document.getElementsByClassName("popup__input_type_name")[0].value;
  document.getElementsByClassName("popup__input_type_subtitle")[0].value;

  const profileTitle = document.querySelector('.profile__title');
  const profileSubitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = name;
  profileSubitle.textContent = subtitle;
}

formElement.addEventListener('submit', handleFormSubmit);

function createCard(cardText, src) {


  const card = document.querySelector('section.card');

  let cardContainer = document.createElement('article');
  cardContainer.classList.add('card__container');
  let cardDeleteButton = document.createElement('button');
  cardDeleteButton.classList.add('card__delete');
  cardDeleteButton.addEventListener('click', deleteCard);
  let cardImg = document.createElement('img');
  cardImg.classList.add('card__image');
  let cardInfo = document.createElement('div');
  cardInfo.classList.add('card__info');
  let cardTitle = document.createElement('h2');
  cardTitle.classList.add('card__title');
  let cardLikeButton = document.createElement('button');
  cardLikeButton.classList.add('card__like');


  
  card.append(cardContainer);
  cardContainer.append(cardDeleteButton, cardImg, cardInfo);
  cardInfo.append(cardTitle, cardLikeButton);

  cardImg.setAttribute('src', src);
  cardTitle.innerText = cardText;

  cardLikeButton.addEventListener('click', function () {
    if (cardLikeButton.classList.contains('card__like_active')) {
      cardLikeButton.classList.remove('card__like_active');
    } else {
      cardLikeButton.classList.add('card__like_active');
    }
  })

const cardImagePopup = document.querySelector('.popup__card');
const popupImage = document.querySelector('.popup__card_image');
const cardSubtitle = document.querySelector('.popup__card_subtitle');

cardImg.addEventListener('click', function() {
  cardImagePopup.classList.add('popup_opened')
  popupImage.setAttribute('src', src); 
  cardSubtitle.textContent = cardText;
});
}


let cards = [
  { cardText: 'Карачаевск', src: './images/Karachaevsk.png' },
  { cardText: 'Домбай', src: './images/Dombay.png' },
  { cardText: 'Эльбрус', src: './images/Elbrus.png' },
  { cardText: 'Камчатка', src: './images/Kamchatka.png' },
  { cardText: 'Мурманск', src: './images/Murmansk.png' },
  { cardText: 'Териберка', src: './images/Teriberka.png' },
]

cards.forEach(function (card) {
  createCard(card.cardText, card.src);
})

addButton.addEventListener('click', function () {
  popupPlace.classList.add('popup_opened');
});



const placeForm = document.querySelector('.popup__place_form');

function getFormValue(event) {
  popupPlace.classList.remove('popup_opened');

  event.preventDefault();

  const placeName = placeForm.querySelector('.card__name_input');
  const placeLink = placeForm.querySelector('.card__link_input');

  const values = {
    placeName: placeName.value,
    placeLink: placeLink.value
  }

  console.log(values);
  createCard(values.placeName, values.placeLink);
}

placeForm.addEventListener('submit', getFormValue);

const cardContainer = document.querySelectorAll('.card__container');
const cardDeleteButton = document.querySelectorAll('.card__delete');


function deleteCard(event) {
  const card = document.querySelector('section.card');
  card.removeChild(event.target.parentNode);
  console.log(event.target.parentNode);
}

cardDeleteButton.forEach(button => {
  button.addEventListener('click', deleteCard);
})


