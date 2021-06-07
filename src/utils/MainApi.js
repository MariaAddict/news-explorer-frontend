const BASE_URL = "https://api.news.mortany.ru/";

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

    authorization(email, password) {
        return fetch(`${this._url}signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
            .then(handleResponse)
    }

    getUserData() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(handleResponse)
    }

    getContent(jwt) {
        return fetch(`${this._url}users/me/`, {
            method: 'GET',
            headers: {
                ...this._headers,
                authorization: `Bearer ${jwt}`
            }
        }).then(handleResponse)
    }

    getSaveArticles() {
        return fetch(`${this._url}articles`, {
            method: 'GET',
            headers: {
                ...this._headers,
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(handleResponse)
    }

    saveNews(word, card) {
        return fetch(`${this._url}articles`, {
            method: 'POST',
            headers: {
                ...this._headers,
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                keyword: word,
                title: card.title,
                text: card.description,
                date: card.publishedAt,
                source: card.source.name,
                link: card.url,
                image: card.urlToImage
            })
        }).then(handleResponse)
    }

    deleteNews(id) {
        return fetch(`${this._url}articles/${id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(handleResponse)
    }
}

const apiMain = new MainApi(BASE_URL, {
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiMain;