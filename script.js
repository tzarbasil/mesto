let popup = document.querySelector('.popup');
let popupContent = document.querySelector('.popup__content');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__form_submit');

editButton.addEventListener('click', function () {
  popup.classList.add('active')
  popupContent.classList.add('active')
});

closeButton.addEventListener('click', function () {
  popup.classList.remove('active');
  popupContent.classList.remove('active');
});

saveButton.addEventListener('click', function () {
  popup.classList.remove('active');
  popupContent.classList.remove('active');
});

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__form_name');
let jobInput = document.querySelector('.popup__form_subtitle');

function handleFormSubmit(evt) {
  evt.preventDefault();


  let name = evt.target.querySelector('.popup__form_name').value
  console.log(name)
  let subtitle = evt.target.querySelector('.popup__form_subtitle').value
  console.log(name)

  document.getElementsByClassName("popup__form_name")[0].value;
  document.getElementsByClassName("popup__form_subtitle")[0].value;

  let profileTitle = document.querySelector('.profile__title');
  let profileSubitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = name;
  profileSubitle.textContent = subtitle;
}

formElement.addEventListener('submit', handleFormSubmit); 
