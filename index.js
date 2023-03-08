//Попапы
const popupProfile = document.querySelector('.popup_type_profile-edit');
const popupPlace = document.querySelector('.popup_type_place-edit');
const popupImage = document.querySelector('.popup__card-image');
const cardImagePopup = document.querySelector('.popup_type_card');
const popupOverlay = document.querySelectorAll('.popup__overlay')
const popup = document.querySelectorAll('.popup')
//Кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelectorAll('.popup__close-button');
const buttonAddPopup = document.querySelector('.profile__button');

const cardSubtitle = document.querySelector('.popup__card-subtitle');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_subtitle');


const profileTitle = document.querySelector('.profile__title');
const profileSubitle = document.querySelector('.profile__subtitle');

function openPopup(popup) { popup.classList.add('popup_opened') }
function closePopup(popup) { popup.classList.remove('popup_opened') }

popup.forEach(function (overlayPopup) {
  overlayPopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(overlayPopup)
    }
  })
})

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile)
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
});

buttonClosePopup.forEach(function (buttonClosePopup) {
  buttonClosePopup.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  })
})

popupOverlay.forEach(function (popupOverlay) {
  popupOverlay.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  })
})

buttonAddPopup.addEventListener('click', function () {
  openPopup(popupPlace);
});


document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popupProfile);
    closePopup(popupPlace);
    closePopup(cardImagePopup);
  }
})

const options = {
  formSelector: '.popup__form',
  submitSelector: '.popup__submit',
  inputSelector: '.popup__input',
  inputSectionSelector: '.popup__field_label',
  inputErrorSelector: '.form__input-error',
  inputErrorClass: 'form__input-error_active',
  inputPopupClass: 'popup__input_type_error',
  inputErrorLineSelector: '.popup__input',
  disabledButtonClass: 'popup__submit_inactive',
}

enableValidation(options)

function handleFormSubmit(evt) {
  closePopup(popupProfile);

  const name = nameInput.value
  const subtitle = jobInput.value

  profileTitle.textContent = name;
  profileSubitle.textContent = subtitle;
  evt.preventDefault();
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



