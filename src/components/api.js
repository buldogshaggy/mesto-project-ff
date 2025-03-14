const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',

    headers: {
        authorization: '96c128e6-12dd-4ec5-ac75-627a0fa1164c',
        'Content-Type': 'application/json'
    }
};

//Загрузка данных профиля с сервера
export function loadUserProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        console.log(err);
      });   
};

export function loadCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
        console.log(err);
      });
};

export function updateProfileData(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        console.log(err);
      });
};

export function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => res.json())
    .catch((err) => {
        console.log(err);
      });
};

export function deleteCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        return res.json();
    })
    .catch((err) => {
        console.log(err);
      });
};

export function removeLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
    })
    .then(res => res.json())
    .catch((err) => {
        console.log(err);
      });
};

export function addLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => res.json())
    .catch((err) => {
        console.log(err);
      });
};

export function updateAvatar(avatarUrl) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      })
    })
    .then(res => res.json())
    .catch((err) => {
        console.log(err);
      });
};