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
  // Выбор формы
  formSelector: '.popup__form',
  // ВЫБОР ИНПУТА
  inputSelector: '.popup__input',
  // ВЫБОР ЛЕЙБЛ
  labelSelector: '.popup__field-text',
  //Нижнее подчёркивание
  inputPopupClass: 'popup__input_type_error',
  // ДОБАВЛЕНИЕ НАДПИСИ ДЛЯ СПАНА
  inputErrorClass: '.popup__form-input-error',
  inputErrorClassActive: 'popup__form-input-error_active',
  // САБМИТ
  submitSelector: '.popup__submit',
  // ВЫКЛЮЧЕННЫЙ САБМИТ
  disabledButtonClass: 'popup__submit_inactive',
}



// //Попапы
export const popupProfile = '.popup_type_profile-edit';
export const popupPlace = '.popup_type_place-edit';
export const popupImage = '.popup__card-image';
export const cardImagePopup = '.popup_type_card';
export const popupAvatar = '.popup_type_avatar';
export const popupConfirmation = '.popup_type_confirmation'

// export const cardImagePopup = document.querySelector('.popup_type_card');
export const popupList = '.popup'
export const submitForm = '.popup__submit'

// //Кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonClosePopupList = document.querySelectorAll('.popup__close-button');
export const buttonAddPopup = document.querySelector('.profile__button');
export const buttonEditAvatar = document.querySelector('.profile__avatar-edit')

// Для карточек
export const cardSubtitle = document.querySelector('.popup__card-subtitle');
// export const cardNameInput = document.querySelector('.popup-card-name');
// export const cardLinkInput = document.querySelector('.popup-card-secondname');
export const cards = 'section.card'

// Инпуты
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_subtitle');


// Профиль
export const profileTitle = document.querySelector('.profile__title');
export const profileSubitle = document.querySelector('.profile__subtitle');

// Формы
export const popupEditForm = document.querySelector('.popup__form_edit');
export const popupPlaceForm = document.querySelector('.popup__form_place');
export const popupAvatarForm = document.querySelector('.popup__form_avatar')

