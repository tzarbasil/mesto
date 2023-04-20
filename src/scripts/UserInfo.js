export default class UserInfo {
  constructor({ title, subtitle }) {
    this._profileTitle = document.querySelector(title);
    this._profileSubtitle = document.querySelector(subtitle);
  }

  getUserInfo() {
    return {
      profileName: this._profileTitle.textContent,
      profileSubtitle: this._profileSubtitle.textContent,
    };
  }

  setUserInfo({ profileName, profileSubtitle }) {
    this._profileTitle.textContent = profileName;
    this._profileSubtitle.textContent = profileSubtitle;
  }
}
