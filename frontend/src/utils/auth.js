const BASE_URL = 'https://api.mesto.tasyushka.nomoredomainsicu.ru'

export const register = ( password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ password: password, email: email, })
    })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
  };

  export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({password, email})
    })
    .then((response => response.json()))
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data
      }
    })
    .catch(err => console.log(err))
  };

  export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        // "Authorization" : `Bearer ${localStorage.getItem('token')}` 
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => data)
  }
  