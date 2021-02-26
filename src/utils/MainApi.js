const BASE_URL = "https://api.mort-news-exp.students.nomoreparties.space/";

const handleResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

class MainApi {
    constructor(url, { headers }) {
        this._url = url;
        this._headers = headers;
    }

    register(email, password, name) {
        return fetch(`${this._url}signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password, name })
        }).then(handleResponse)
    }

    authorization (email, password ) {
        return fetch(`${this._url}signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
            .then(handleResponse)
    }
}

const apiMain = new MainApi(BASE_URL, {
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiMain;