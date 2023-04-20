const KarachaevskImage = new URL('../images/Karachaevsk.png', import.meta.url)
const DombayImage = new URL('../images/Dombay.png', import.meta.url)
const ElbrusImage = new URL('../images/Elbrus.png', import.meta.url)
const KamchatkaImage = new URL('../images/Kamchatka.png', import.meta.url)
const MurmanskImage = new URL('../images/Murmansk.png', import.meta.url)
const TeriberkaImage = new URL('../images/Teriberka.png', import.meta.url)

export const cardsDefault = [
  { name: 'Карачаевск', link: KarachaevskImage },
  { name: 'Домбай', link: DombayImage },
  { name: 'Эльбрус', link: ElbrusImage },
  { name: 'Камчатка', link: KamchatkaImage },
  { name: 'Мурманск', link: MurmanskImage },
  { name: 'Териберка', link: TeriberkaImage },
]

export const options = {
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

// //Попапы
export const popupProfile = document.querySelector('.popup_type_profile-edit');
export const popupPlace = document.querySelector('.popup_type_place-edit');
export const popupImage = document.querySelector('.popup__card-image');
export const cardImagePopup = document.querySelector('.popup_type_card');
export const popupList = document.querySelector('.popup')
export const submitForm = document.querySelector('.popup__submit')

// //Кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonClosePopupList = document.querySelectorAll('.popup__close-button');
export const buttonAddPopup = document.querySelector('.profile__button');

// Для карточек
export const cardSubtitle = document.querySelector('.popup__card-subtitle');
export const cardNameInput = document.querySelector('.popup-card-name');
export const cardLinkInput = document.querySelector('.popup-card-secondname');
export const cards = document.querySelector('section.card')

// Инпуты
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_subtitle');


// Профиль
export const profileTitle = document.querySelector('.profile__title');
export const profileSubitle = document.querySelector('.profile__subtitle');

// Формы
export const popupEditForm = document.querySelector('.popup__form_edit');
export const popupPlaceForm = document.querySelector('.popup__form_place');

