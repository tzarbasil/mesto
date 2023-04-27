import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import './index.css';
import { api } from "../scripts/Api.js";

import {
  cardsDefault, popupProfile, popupPlace, cardImagePopup, buttonEditProfile, buttonAddPopup, cards, nameInput,
  jobInput, popupEditForm, popupPlaceForm, popupAvatar, popupConfirmation, buttonEditAvatar, options, popupAvatarForm
} from '../utils/constants.js';

// Профиль
// const addUserInfo = (inputValues) => {
//   userInfo.setUserInfo({
//     name: inputValues.name,
//     about: inputValues.title
//   });
// };


const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
  avatar: ".profile__avatar",
});


Promise.all([api.getUserInfo(), api.getPlaceCards()])
.then(([userData, placeCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(placeCards);
  })
  .catch(console.log);

const cardList = new Section((data) => {
  cardList.addItem(createCard(data));
}, cards);

const createCard = (data) => {
  const card = new Card(data, "#card__template", () => {
    newPopupWithImage.open(data);
  });
  return card.createElement();
};

  const handleFormSubmitEdit = (inputValues) => {
    api
      .sendUserInfo(inputValues)
      .then((data) => {
        console.log(data)
        userInfo.setUserInfo(data);
        openProfilePopup.close()
      })
      .catch(console.log);
  };


  const handleAvatarEditSubmit = (input) => {
    api.patchAvatar(input.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
        openAvatarPopup.close()
      })
      .catch(console.log);
  };

  const addPlaceCard = (input) => {
    api.postNewCard(input)
      .then((data) => {
        cardList.addItem(createCard(data));
        openPlacePopup.close()
      })
      .catch(console.log);
  };
  
const openEditPopup = () => {
  const userInformation = userInfo.getUserInfo();
  nameInput.value = userInformation.name;
  jobInput.value = userInformation.about;
  openProfilePopup.open();
};

const editFormValidation = new FormValidator(options, popupEditForm);

const avatarFormValidation = new FormValidator(options, popupAvatarForm);


const placeFormValidation = new FormValidator(options, popupPlaceForm);


buttonEditProfile.addEventListener('click', openEditPopup)

buttonAddPopup.addEventListener('click', () => {
  openPlacePopup.open()
})

buttonEditAvatar.addEventListener('click', () => {
  openAvatarPopup.open()
})
const openPlacePopup = new PopupWithForm(popupPlace, addPlaceCard)
const openAvatarPopup = new PopupWithForm(popupAvatar, handleAvatarEditSubmit)
const openProfilePopup = new PopupWithForm(popupProfile, handleFormSubmitEdit)
const newPopupWithImage = new PopupWithImage(cardImagePopup)

editFormValidation.enableValidation();
avatarFormValidation.enableValidation();
placeFormValidation.enableValidation();

openAvatarPopup.setEventListeners()

openProfilePopup.setEventListeners()
openPlacePopup.setEventListeners()
newPopupWithImage.setEventListeners()

//  Всё, что связано с АПИ

