const apiSettings = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'ab13029f-8c56-4dec-b26e-24c2c3894c0c',
    'Content-type': 'application/json'
  }
};

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
    };
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  };

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then(this._checkResponse);
  };

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(this._checkResponse);
  };

  getPhotocards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  };

  addNewСard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then(this._checkResponse);
  };

  deleteСard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  };

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._checkResponse);
    } else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._checkResponse);
    };
  };
};

export const api = new Api(apiSettings);
