export default class UserInfo {
  constructor({ titleSelector, subtitleSelector, avatar }) {
    this._name = document.querySelector(titleSelector);
    this._about = document.querySelector(subtitleSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this.userId = _id;
  }
}
