import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import './index.css'; // добавьте импорт главного файла стилей

import {
  cardsDefault, popupProfile, popupPlace, cardImagePopup, buttonEditProfile, buttonAddPopup, cards, nameInput,
  jobInput, popupEditForm, popupPlaceForm, options
} from '../utils/constants.js';

// Профиль
const addUserInfo = (inputValues) => {
  userInfo.setUserInfo({
    profileName: inputValues.name,
    profileSubtitle: inputValues.title
  });
};

const openEditPopup = () => {
  const userInformation = userInfo.getUserInfo();
  nameInput.value = userInformation.profileName;
  jobInput.value = userInformation.profileSubtitle;
  openProfilePopup.open();
};


const editFormValidation = new FormValidator(options, popupEditForm);
editFormValidation.enableValidation();


const openProfilePopup = new PopupWithForm(popupProfile, addUserInfo)

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
});

buttonEditProfile.addEventListener('click', openEditPopup)


const placeFormValidation = new FormValidator(options, popupPlaceForm);
placeFormValidation.enableValidation();

buttonAddPopup.addEventListener('click', () => {
  openPlacePopup.open()
})

const newPopupWithImage = new PopupWithImage(cardImagePopup)

// Карточки

const createCard = (data) => {
  const card = new Card(data, "#card__template", () => {
    newPopupWithImage.open(data);
  });
  return card.createElement();
};

const addCard = (inputValues) => {
  const cardItem = {
    name: inputValues.cardName,
    link: inputValues.cardLink
  };
  cardsList.prependItem(createCard(cardItem));
};

const cardsList = new Section(
  {
    items: cardsDefault,
    renderer: (data) => {
      cardsList.addItem(createCard(data));
    },
  },
  cards
);
const openPlacePopup = new PopupWithForm(popupPlace, addCard)

cardsList.renderItems()

openProfilePopup.setEventListeners()
openPlacePopup.setEventListeners()
newPopupWithImage.setEventListeners()

