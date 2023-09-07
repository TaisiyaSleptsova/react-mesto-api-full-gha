class Api {
    constructor(options) {
      this._url = options.baseUrl;
      // this._headers = options.headers;
      // this._authorization = options.headers.authorization
    }

    _checkError (res) {
      return res.ok ? res.json() : Promise.reject()
    }

    getUserInfo(token) {
      return fetch(`${this._url}/users/me`, {
        headers: {
          // authorization: this._authorization
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(this._checkError)
    }

    getListCards(token) {
        return fetch(`${this._url}/cards`, {
          headers: {
            // authorization: this._authorization
            "Authorization" : `Bearer ${token}`
          }
        })
      .then(this._checkError)
    }

    getProfileInfo(data, token) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            // this._headers,
            "Authorization" : `Bearer ${token}`
          },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        })
      })
      .then(this._checkError)
    }

    getProfileAvatar(data, token) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
          // headers: this._headers,
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
          },
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
      .then(this._checkError)
    }
  
    addNewCard(data, token) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
          // headers: this._headers,
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
          },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkError)
    }
  
    putLikes(cardId, token) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          // authorization: this._authorization
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(this._checkError)
    }

    deleteLikes(cardId, token) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          // authorization: this._authorization
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(this._checkError)
    }

    deleteCard(cardId, token) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          // authorization: this._authorization
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(this._checkError)
    }

  }

  const api = new Api({
    // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    baseUrl: 'http://api.mesto.tasyushka.nomoredomainsicu.ru',    
    // headers: {
    //   authorization: 'e2e8c9aa-6f31-4976-b766-f461d6a54f76',
    //   'Content-Type': 'application/json'
    // }
  }); 

  export default api;