import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import './index.css';
import { api } from "../scripts/Api.js";

import {
  popupProfile, popupPlace, cardImagePopup, buttonEditProfile, buttonAddPopup, cards, nameInput,
  jobInput, popupEditForm, popupPlaceForm, popupAvatar, popupConfirmation, buttonEditAvatar, options, popupAvatarForm
} from '../utils/constants.js';


const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
  avatar: ".profile__avatar",
});



Promise.all([api.getProfileInformation(), api.getCards()])
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


  const submitProfileEdit = (inputValues) => {
    api
      .setProfileInformation(inputValues)
      .then((data) => {
        console.log(data)
        userInfo.setUserInfo(data);
        openProfilePopup.close()
      })
      .catch(console.log);
  };


  const submitAvatarEdit = (input) => {
    api.getAvatarInfo(input.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
        openAvatarPopup.close()
      })
      .catch(console.log);
  };

  const sendCards = (input) => {
    api.addNewCard(input)
      .then((res) => {
        cardList.addItem(createCard(res), true);
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


buttonEditProfile.addEventListener('click', openEditPopup)

buttonAddPopup.addEventListener('click', () => {
  openPlacePopup.open()
})

buttonEditAvatar.addEventListener('click', () => {
  openAvatarPopup.open()
})

const editFormValidation = new FormValidator(options, popupEditForm);
const avatarFormValidation = new FormValidator(options, popupAvatarForm);
const placeFormValidation = new FormValidator(options, popupPlaceForm);

const openPlacePopup = new PopupWithForm(popupPlace, sendCards)
const openAvatarPopup = new PopupWithForm(popupAvatar, submitAvatarEdit)
const openProfilePopup = new PopupWithForm(popupProfile, submitProfileEdit)
const newPopupWithImage = new PopupWithImage(cardImagePopup)

editFormValidation.enableValidation();
avatarFormValidation.enableValidation();
placeFormValidation.enableValidation();
openAvatarPopup.setEventListeners()
openProfilePopup.setEventListeners()
openPlacePopup.setEventListeners()
newPopupWithImage.setEventListeners()



