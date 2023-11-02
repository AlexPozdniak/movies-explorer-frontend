import { API_URL, JWT_LOCAL_KEY, MAIN_API_URL, MOVIES_ROUT, SIGN_IN_ROUT, SIGN_UP_ROUT, USER_ROUT, YOUTUBE_TRAILER_LINK } from "./constants";

class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}${USER_ROUT}`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem(JWT_LOCAL_KEY)}`,
      },
    }).then(this._checkResponse);
  }

  updateUser(data) {
    return fetch(`${this._url}${USER_ROUT}`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem(JWT_LOCAL_KEY)}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._url}${MOVIES_ROUT}`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  saveMovie(data) {
    return fetch(`${this._url}${MOVIES_ROUT}/`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        movieId: data.id,
        country: data.country ?? "country",
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${API_URL}${data.image.url}`,
        trailerLink:
          data.trailerLink ??
          `${YOUTUBE_TRAILER_LINK}${data.nameRU}`,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `${API_URL}${data.image.formats.thumbnail.url}`,
        
      }),
    }).then(this._checkResponse);
  }

  register(name, email, password) {
    return fetch(`${this._url}${SIGN_UP_ROUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    }).then(this._checkResponse);
  }
  
  login(email, password) {
    return fetch(`${this._url}${SIGN_IN_ROUT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    }).then(this._checkResponse);
  }
  
  check(jwt) {
    return fetch(`${this._url}${USER_ROUT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }

  removeMovie(movieId) {
    return fetch(`${this._url}${MOVIES_ROUT}/${movieId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem(JWT_LOCAL_KEY)}`,
      },
    }).then(this._checkResponse);
  }
}

const mainApi = new MainApi({
  url: MAIN_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
