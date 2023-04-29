export class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  __checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
  }

  getProfileInformation() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
      method: "GET",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  setProfileInformation({ name, about }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this.__checkResponse);
  }

  getCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      method: "GET",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  addNewCard({ name, link }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.__checkResponse);
  }

  getAvatarInfo(avatar) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me/avatar', {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this.__checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId._id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  getLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this.__checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.__checkResponse);
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "7ee89985-112e-4652-b81d-a30402b6b6f7",
    "Content-Type": "application/json",
  },
});