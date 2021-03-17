const apiKey = "28143ac1be044c6692523f08b6ae51cd";
const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'-');
const dateSevenDaysAgo = new Date(Date.now() + -7*24*3600*1000).toJSON().slice(0,10).replace(/-/g,'-');

const handleResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

class NewsApi {
    constructor(url, { headers }) {
        this._url = url;
        this._headers = headers;
    }

    getNews(word) {
        return fetch(`${this._url}everything?q=${word}&from=${dateSevenDaysAgo}&to=${currentDate}&pageSize=${"100"}&apiKey=${apiKey}`, {
            method: 'GET',
            headers: this._headers
        })
            .then(handleResponse)
    }
}

const apiNews = new NewsApi(`https://nomoreparties.co/news/v2/`, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export default apiNews;