//Попапы
const popupProfile = document.querySelector('.popup_type_profile-edit');
const popupPlace = document.querySelector('.popup_type_place-edit');
const popupImage = document.querySelector('.popup__card-image');
const cardImagePopup = document.querySelector('.popup_type_card');
const popupOverlayList = document.querySelectorAll('.popup__overlay')
const popupList = document.querySelectorAll('.popup')
//Кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupList = document.querySelectorAll('.popup__close-button');
const buttonAddPopup = document.querySelector('.profile__button');

const cardSubtitle = document.querySelector('.popup__card-subtitle');

const formElements = document.querySelectorAll('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_subtitle');


const profileTitle = document.querySelector('.profile__title');
const profileSubitle = document.querySelector('.profile__subtitle');

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__subtitle').textContent;

const cardTemplate = document.querySelector('#card__template').content
const cardsBlock = document.querySelector('section.card');


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEsc)
}


function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popupList.forEach(function (overlayPopup) {
  overlayPopup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(overlayPopup)
    }
  })
})

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile)
});

buttonClosePopupList.forEach(function (buttonClosePopupList) {
  buttonClosePopupList.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  })
})

buttonAddPopup.addEventListener('click', function () {
  openPopup(popupPlace);
});



const options = {
  formSelector: '.popup__form',
  submitSelector: '.popup__submit',
  inputSelector: '.popup__input',
  inputSectionSelector: '.popup__field-text',
  inputErrorSelector: '.popup__form-input-error',
  inputErrorClass: 'popup__form-input-error_active',
  inputPopupClass: 'popup__input_type_error',
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


formElements.forEach(function (formElements) {
  formElements.addEventListener('submit', handleFormSubmit);
})

function createCard(cardText, src, alt) {

  const cardContainer = cardTemplate.querySelector('.card__container').cloneNode(true);
  const cardImg = cardContainer.querySelector('.card__image')
  const cardTitle = cardContainer.querySelector('.card__title')
  const cardLikeButton = cardContainer.querySelector('.card__like')
  const cardDeleteButton = cardContainer.querySelectorAll('.card__delete');

  cardImg.setAttribute('src', src);
  cardImg.setAttribute('alt', alt)
  cardTitle.textContent = cardText;

  cardDeleteButton.forEach(button => {
    button.addEventListener('click', deleteCard);
  })

  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like_active')
  })

  cardImg.addEventListener('click', function () {
    openPopup(cardImagePopup)
    popupImage.setAttribute('src', src);
    popupImage.setAttribute('alt', alt);
    cardSubtitle.textContent = cardText;
  });


  function deleteCard(event) {
    const card = document.querySelector('section.card');
    card.removeChild(event.target.closest('article'));
  }


  return cardContainer;
}

function renderCard(card) {
  cardsBlock.prepend(createCard(card.cardText, card.src, card.alt));
}

const cardsDefault = [
  { cardText: 'Карачаевск', src: './images/Karachaevsk.png', alt: 'Карачаевск' },
  { cardText: 'Домбай', src: './images/Dombay.png', alt: 'Домбай' },
  { cardText: 'Эльбрус', src: './images/Elbrus.png', alt: 'Эльбрус' },
  { cardText: 'Камчатка', src: './images/Kamchatka.png', alt: 'Камчатка' },
  { cardText: 'Мурманск', src: './images/Murmansk.png', alt: 'Мурманск' },
  { cardText: 'Териберка', src: './images/Teriberka.png', alt: 'Териберка' },
]
cardsDefault.forEach(function (element) {
  renderCard(element)
})

const placeForm = document.querySelector('.popup__form_place');
const src = placeForm.querySelector('.popup-card-secondname');
const alt = placeForm.querySelector('.popup-card-secondname')

function getFormValue(event) {
  closePopup(popupPlace);
  event.preventDefault();

  const cardText = placeForm.querySelector('.popup-card-name');

  const values = {
    cardText: cardText.value,
    src: src.value,
    alt: alt.value
  }
  createCard(renderCard(values));
}

placeForm.addEventListener('submit', getFormValue);



