import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import './pages/index.css'; // добавьте импорт главного файла стилей

import {
  cardsDefault, popupProfile, popupPlace, cardImagePopup, buttonEditProfile, buttonAddPopup, cardNameInput, cardLinkInput, cards, nameInput,
  jobInput, popupEditForm, popupPlaceForm, options
} from './scripts/constants.js';


// Профиль
const addUserInfo = (input) => {
  userInfo.setUserInfo({
    profileName: input[0],
    profileSubtitle: input[1]
  });
  openProfilePopup.closepopup();
  popupEditForm.reset()
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
  title: ".profile__title",
  subtitle: ".profile__subtitle",
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
  return card.renderElements();
};

const renderCards = (data) => {
  renderDefaultCards.prependItem(createCard(data));
  openPlacePopup.closepopup()
  popupPlaceForm.reset()
};

const addCard = () => {
  const cardItem = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  renderCards(cardItem);
};

const renderDefaultCards = new Section(
  {
    items: cardsDefault,
    renderer: (data) => {
      renderDefaultCards.addItem(createCard(data));
    },
  },
  cards
);
const openPlacePopup = new PopupWithForm(popupPlace, addCard)

renderDefaultCards.renderItems()

openProfilePopup.setEventListeners()
openPlacePopup.setEventListeners()
newPopupWithImage.setEventListeners()

