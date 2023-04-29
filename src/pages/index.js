import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupConfirm from "../scripts/PopupConfirm.js";
import UserInfo from "../scripts/UserInfo";
import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import './index.css';
import { api } from "../scripts/Api.js";


import {
  popupProfile, popupPlace, cardImagePopup, buttonEditProfile, buttonAddPopup, cards, nameInput,
  jobInput, popupEditForm, popupPlaceForm, popupAvatar, buttonEditAvatar, options, popupAvatarForm
} from '../utils/constants.js';


const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
  avatar: ".profile__avatar",
});

const createCard = (data) => {
  const card = new Card(data, "#card__template",
    () => {
      newPopupWithImage.open(data);
    },
    () => {
      confirmPopup.open(data, card._cardContainer);
    },
    userInfo.userId,
    getLike,
    deleteLike
  );
  return card.createElement();
};

const cardList = new Section((data) => {
  cardList.addItem(createCard(data));
}, cards);

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


Promise.all([api.getProfileInformation(), api.getCards()])
  .then(([userInformation, defaultCards]) => {
    userInfo.setUserInfo(userInformation);
    cardList.renderItems(defaultCards);
  })
  .catch(console.log);

const getLike = (card) => {
  api.getLike(card.getId())
    .then((res) => {
      card.clickCardLike(res);
    })
    .catch(console.log);
};

const deleteLike = (card) => {
  api.deleteLike(card.getId()).then((res) => {
    card.clickCardLike(res);
  })
    .catch(console.log);
};

const submitProfileEdit = (inputValues) => {
  openProfilePopup.addSavingText(true, "Coхранение...");
  api
    .setProfileInformation(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
      openProfilePopup.close()
    })
    .catch(console.log);
};

const submitAvatarEdit = (input) => {
  openAvatarPopup.addSavingText(true, "Coхранение...");
  api.getAvatarInfo(input.avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      openAvatarPopup.close()
    })
    .catch(console.log);
};

const sendCards = (input) => {
  openPlacePopup.addSavingText(true, "Coхранение...");
  api.addNewCard(input)
    .then((res) => {
      cardList.addItem(createCard(res), true);
      openPlacePopup.close()
    })
    .catch(console.log);
};

const handlePlaceSubmitDelete = () => {
  confirmPopup.addSavingText(true, "Coхранение...");
  api.deleteCard(confirmPopup.cardId)
    .then(() => {
      confirmPopup.close();
      confirmPopup.card.remove();
    })
    .catch(console.log);
};

const editFormValidation = new FormValidator(options, popupEditForm);
const avatarFormValidation = new FormValidator(options, popupAvatarForm);
const placeFormValidation = new FormValidator(options, popupPlaceForm);

const confirmPopup = new PopupConfirm(".popup_type_confirmation", handlePlaceSubmitDelete)
const openPlacePopup = new PopupWithForm(popupPlace, sendCards)
const openAvatarPopup = new PopupWithForm(popupAvatar, submitAvatarEdit)
const openProfilePopup = new PopupWithForm(popupProfile, submitProfileEdit)
const newPopupWithImage = new PopupWithImage(cardImagePopup)

confirmPopup.setEventListeners()
editFormValidation.enableValidation();
avatarFormValidation.enableValidation();
placeFormValidation.enableValidation();
openAvatarPopup.setEventListeners()
openProfilePopup.setEventListeners()
openPlacePopup.setEventListeners()
newPopupWithImage.setEventListeners()



