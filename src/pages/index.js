import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import './index.css';
import { api } from "../components/Api.js";


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
    function handleDeleteClick() {
      const deleteCardSubmit = () => {
        confirmPopup.addSavingText(true, "Удаление...");
        return api.deleteCard(confirmPopup.cardId)
          .then(() => {
            card.removeCard()
            confirmPopup.close();
          })
          .catch(console.log)
          .finally(() => {
            confirmPopup.addSavingText(false);
          })
      }
      confirmPopup.open(data, card._cardContainer);
      confirmPopup.setCallbackConfirm(deleteCardSubmit)
    },

    userInfo.userId,
    getLike,
    deleteLike,
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
    .catch(console.log)
    .finally(() => {
      openProfilePopup.addSavingText(false);
    })
};

const submitAvatarEdit = (input) => {
  openAvatarPopup.addSavingText(true, "Coхранение...");
  api.getAvatarInfo(input.avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      openAvatarPopup.close()
    })
    .catch(console.log)
    .finally(() => {
      openAvatarPopup.addSavingText(false);
    })
};

const sendCards = (input) => {
  openPlacePopup.addSavingText(true, "Coхранение...");
  api.addNewCard(input)
    .then((res) => {
      cardList.addItem(createCard(res), true);
      openPlacePopup.close()
    })
    .catch(console.log)
    .finally(() => {
      openPlacePopup.addSavingText(false);
    })
};

const editFormValidation = new FormValidator(options, popupEditForm);
const avatarFormValidation = new FormValidator(options, popupAvatarForm);
const placeFormValidation = new FormValidator(options, popupPlaceForm);

const confirmPopup = new PopupConfirm(".popup_type_confirmation")
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
