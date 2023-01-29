let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__submit');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened')
  document.getElementsByClassName("profile__title")[0].textContent;
  document.getElementsByClassName("profile__subtitle")[0].textContent;
});

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
  
});

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_subtitle');

function handleFormSubmit(evt) {
  popup.classList.remove('popup_opened');
  evt.preventDefault();


  let name = evt.target.querySelector('.popup__input_type_name').value
  console.log(name)
  let subtitle = evt.target.querySelector('.popup__input_type_subtitle').value
  console.log(name)

  document.getElementsByClassName("popup__input_type_name")[0].value;
  document.getElementsByClassName("popup__input_type_subtitle")[0].value;

  let profileTitle = document.querySelector('.profile__title');
  let profileSubitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = name;
  profileSubitle.textContent = subtitle;
}

formElement.addEventListener('submit', handleFormSubmit);  