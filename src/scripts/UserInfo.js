export default class UserInfo {
  constructor({ titleSelector, subtitleSelector, avatar }) {
    this._name = document.querySelector(titleSelector);
    this._about = document.querySelector(subtitleSelector);
    this._avatar = document.querySelector(avatar);  }

  // Публичный метод, который возвращает объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  // Публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    }
}
