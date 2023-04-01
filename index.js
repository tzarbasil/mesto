import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// //Попапы
const popupProfile = document.querySelector('.popup_type_profile-edit');
const popupPlace = document.querySelector('.popup_type_place-edit');
const popupImage = document.querySelector('.popup__card-image');
const cardImagePopup = document.querySelector('.popup_type_card');
const popupList = document.querySelectorAll('.popup')

// //Кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupList = document.querySelectorAll('.popup__close-button');
const buttonAddPopup = document.querySelector('.profile__button');

// Для карточек
const cardSubtitle = document.querySelector('.popup__card-subtitle');
const placesContainer = document.querySelector('.card')
const cardNameInput = document.querySelector('.popup-card-name');
const cardLinkInput = document.querySelector('.popup-card-secondname');
const cards = document.querySelector('section.card')
const cardSubmitButton = document.querySelector('.popup__submit_place')

// Все формы
const formElements = document.querySelectorAll('.popup__form');

// Инпуты
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_subtitle');

// Профиль
const profileTitle = document.querySelector('.profile__title');
const profileSubitle = document.querySelector('.profile__subtitle');

// Формы
const popupEditForm = document.querySelector('.popup__form_edit');
const popupPlaceForm = document.querySelector('.popup__form_place');

// Открытие/закрытие попапов /////////////////////////////////////////////////
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


buttonClosePopupList.forEach(function (buttonClosePopupList) {
  buttonClosePopupList.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  })
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Кнопки редактировния

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupProfile)
});


buttonAddPopup.addEventListener('click', function () {
  openPopup(popupPlace);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Создание карточек


const cardsDefault = [
  { name: 'Карачаевск', link: './images/Karachaevsk.png' },
  { name: 'Домбай', link: './images/Dombay.png' },
  { name: 'Эльбрус', link: './images/Elbrus.png' },
  { name: 'Камчатка', link: './images/Kamchatka.png' },
  { name: 'Мурманск', link: './images/Murmansk.png' },
  { name: 'Териберка', link: './images/Teriberka.png' },
]

// Открывается попап изображения
const openImagePopup = (title, imageUrl) => {
  openPopup(cardImagePopup);
  popupImage.setAttribute("src", imageUrl);
  popupImage.setAttribute("alt", title);
  cardSubtitle.textContent = title;
  console.log('открылся попа чево')
};

const render = (link, title) => {
  const cardData = {
    title: title,
    link: link,
  };

  const card = new Card(cardData, "#card__template", openImagePopup);
  placesContainer.prepend(card.renderElements());
};

cardsDefault.forEach((item) => {
  render(item.link, item.name);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Добавление карточки и сабмиты
function createCard(evt) {
  evt.preventDefault();
  const card = new Card({ title: cardNameInput.value, link: cardLinkInput.value }, "#card__template", openImagePopup);
  cards.prepend(card.renderElements());
  closePopup(popupPlace);
}

cardSubmitButton.addEventListener('click', createCard);


function formSubmit(evt) {
  closePopup(popupProfile);
  const profileName = nameInput.value
  const subtitle = jobInput.value
  profileTitle.textContent = profileName;
  profileSubitle.textContent = subtitle;
  evt.preventDefault();
}

formElements.forEach(function (formElements) {
  formElements.addEventListener('submit', formSubmit);
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Валидация профилей 
const options = {
  // ВЫБОР ИНПУТА
  inputSelector: '.popup__input',
  //Нижнее подчёркивание
  inputPopupClass: 'popup__input_type_error',
  // ДОБАВЛЕНИЕ НАДПИСИ ДЛЯ СПАНА
  inputErrorClass: 'popup__form-input-error_active',
  // САБМИТ
  submitSelector: '.popup__submit',
  // ВЫКЛЮЧЕННЫЙ САБМИТ
  disabledButtonClass: 'popup__submit_inactive',
}


const formValidatorProfile = new FormValidator(options, popupEditForm);
formValidatorProfile.enableValidation();

const formValidatorCard = new FormValidator(options, popupPlaceForm);
formValidatorCard.enableValidation();
