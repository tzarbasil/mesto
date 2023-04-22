export default class UserInfo {
    constructor({ titleSelector, subtitleSelector }) {
        this._profileTitle = document.querySelector(titleSelector);
        this._profileSubtitle = document.querySelector(subtitleSelector);
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
