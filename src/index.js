import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import cardsDefault from "./constants.js"

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
const cardNameInput = document.querySelector('.popup-card-name');
const cardLinkInput = document.querySelector('.popup-card-secondname');
const cards = document.querySelector('section.card')

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
  nameInput.value = profileTitle.textContent
  jobInput.value = profileSubitle.textContent
  editFormValidation.toggleButtonState(true);
});

buttonAddPopup.addEventListener('click', function () {
  openPopup(popupPlace);
  cardFormValidation.toggleButtonState(true);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Открывается попап изображения
const openImagePopup = (name, imageUrl) => {
  openPopup(cardImagePopup);
  popupImage.setAttribute("src", imageUrl);
  popupImage.setAttribute("alt", name);
  cardSubtitle.textContent = name;
};

cardsDefault.forEach((item) => {
  renderCard(createCard(item.name, item.link))  
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Добавление карточки через попап
function createCardFormInput(evt) {
  evt.preventDefault();
  const cardNew = createCard(cardNameInput.value, cardLinkInput.value)
  closePopup(popupPlace);
  console.log(cardNew)
  popupPlaceForm.reset();
  renderCard(cardNew)
}

function renderCard(cardNew){
  cards.prepend(cardNew.renderElements());
}

// возврат карточки
function createCard(name, link) {
  return new Card({ name: name, link: link }, "#card__template", openImagePopup);
}

popupPlaceForm.addEventListener('submit', createCardFormInput);

function submitEditProfileForm(evt) {
  closePopup(popupProfile);
  const profileName = nameInput.value
  const subtitle = jobInput.value
  profileTitle.textContent = profileName;
  profileSubitle.textContent = subtitle;
  evt.preventDefault();
}

popupEditForm.addEventListener('submit', submitEditProfileForm);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

const editFormValidation = new FormValidator(options, popupEditForm);
editFormValidation.enableValidation();

const cardFormValidation = new FormValidator(options, popupPlaceForm);
cardFormValidation.enableValidation();
