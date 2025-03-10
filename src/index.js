import './pages/index.css';
// import { createCard, handleLike } from './components/card.js';
import { openPopup, closePopup, handleOverlayClick } from './components/modal.js';
// import { initialCards } from './scripts/cards.js';

export const container = document.getElementById('card-container');

// Получаем попап с картинкой
export const cardImagePopup = document.querySelector('.popup_type_image');

// Находим поля картинки
export const imageSrc = cardImagePopup.querySelector('.popup__image');
export const imageTitle = cardImagePopup.querySelector('.popup__caption');

//Закрытие попапа по клику на оверлей, нашли оверлей
export const popups = document.querySelectorAll('.popup');

const editProfileBtn = document.querySelector('.profile__edit-button');
export const editProfilePopup = document.querySelector('.popup_type_edit');

const closeBtn = document.querySelectorAll('.popup__close');

//Форма редактирования профиля
const formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');

export const newPlaceForm = document.querySelector('.popup_type_new-card');
const newPlaceBtn = document.querySelector('.profile__add-button');

export const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
export const cardImgUrlInput = newPlaceForm.querySelector('.popup__input_type_url');

//Куда будем подставлять значения
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__description');

//Выводим карточки
// function prepareCards() {
//     initialCards.forEach((x) => {
//         const cardElement = createCard(x.name, x.link, handleLike, handleOpenImg);
//         container.append(cardElement);
//     });
// };

export function handleOpenImg(event) {
    imageSrc.src = event.target.src
    imageTitle.textContent = event.target.alt
    imageSrc.alt = imageTitle.textContent;
    openPopup(cardImagePopup)
};

//Отправка формы и закрытие попапа
function handleProfileFormSubmit(evt) {
    evt.preventDefault(evt);

//Получили значения полей
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

//Вставили новые значения
    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;

//Закрыли попап
    closePopup(editProfilePopup);
};

//Обработчик клика по крестику
closeBtn.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closePopup(popup);
    });
});

//Обработчик клика по кнопке с карандашом
editProfileBtn.addEventListener('click', () => {
    openPopup(editProfilePopup);
    clearValidation(formElement, formValidationConfig);
});

//поставили счетчик клика 
popups.forEach(popup => {
    popup.addEventListener('click', handleOverlayClick);
});

formElement.addEventListener('submit', handleProfileFormSubmit);

//Открываем форму Новое место
newPlaceBtn.addEventListener('click', () => {
    openPopup(newPlaceForm);
});

newPlaceForm.addEventListener('submit', addCard);

//Дабовляем анимацию
popups.forEach((element) => element.classList.add('popup_is-animated'));

//Передаем в поля уже имеющуюся информацию
nameInput.value = nameElement.textContent;
jobInput.value = jobElement.textContent;

function addCard(evt) {
    evt.preventDefault(evt);

    const newCardElement = createCard(
        cardNameInput.value,
        cardImgUrlInput.value,
        handleLike,
        handleOpenImg
    );
    container.prepend(newCardElement);

    cardNameInput.value = '';
    cardImgUrlInput.value = '';
    clearValidation(formElement, formValidationConfig);

    closePopup(newPlaceForm);
};

// prepareCards();

const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(formValidationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formValidationConfig.errorClass);
};

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(formValidationConfig.inputErrorClass);
    errorElement.classList.remove(formValidationConfig.errorClass);
    errorElement.textContent = '';
};

function isValid(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

function setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(formValidationConfig.inputSelector));
    const buttonElement = formElement.querySelector(formValidationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

    formList.forEach((formElement) => {
        setEventListener(formElement);
    });
};

enableValidation();

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(formValidationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(formValidationConfig.inactiveButtonClass);
    }
};

function clearValidation(formElement, formValidationConfig) {
    const inputList = formElement.querySelectorAll(formValidationConfig.inputSelector);

    inputList.forEach((inputElement) => {
        inputElement.classList.remove(formValidationConfig.inputErrorClass);

        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove(formValidationConfig.errorClass);
        }
    });
    
    const submitButton = formElement.querySelector(formValidationConfig.submitButtonSelector);
    if (submitButton) {
        submitButton.classList.add(formValidationConfig.inactiveButtonClass);
        submitButton.disabled = true;
    };
};

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',

    headers: {
        authorization: '96c128e6-12dd-4ec5-ac75-627a0fa1164c',
        'Content-Type': 'aplication/json'
    }
};

//Загрузка данных профиля с сервера
function loadUserProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        return res.json();
    })
    // .then((userData) => {
    //     updateProfile(userData);
    // })    
}

//Обновляем данные профиля
function updateProfile(userData) {
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
    const profileImage = document.querySelector('.profile__image');

    if (profileTitle && profileDescription && profileImage) {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.src = userData.avatar;
        profileImage.alt = 'Фото профиля';
    }
}

loadUserProfile();

// Загрузка карточек
function loadCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// Создание DOM-элемента карточки
function createCard(cardData, userId) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like_count');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Отображаем количество лайков
    likeCount.textContent = cardData.likes.length;

    // Проверяем, лайкнул ли пользователь карточку
    const isLiked = cardData.likes.some((like) => like._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // Показываем кнопку удаления только для своих карточек
    if (cardData.owner._id === userId) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    }

    // Обработчик для удаления карточки
    deleteButton.addEventListener('click', () => {
        // Здесь можно добавить запрос на удаление карточки
        cardElement.remove();
    });

    // Обработчик для лайка
    likeButton.addEventListener('click', () => {
        // Здесь можно добавить запрос на лайк/дизлайк
        likeButton.classList.toggle('card__like-button_is-active');
    });

    return cardElement;
}

// Отображение карточек на странице
function renderCards(cards, containerSelector, userId) {
    const cardsContainer = document.querySelector(containerSelector);

    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, userId);
        cardsContainer.append(cardElement);
    });
}

// Инициализация загрузки и отображения карточек
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([loadUserProfile(), loadCards()])
        .then(([userData, cards]) => {
            console.log('Данные пользователя:', userData);
            console.log('Карточки:', cards);

            // Отображаем карточки, передавая _id пользователя
            renderCards(cards, '.places__list', userData._id); // Замените '.cards__list' на ваш селектор
        })
        .catch((err) => {
            console.error('Ошибка при загрузке данных:', err);
        });
});

function updateProfileData(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: 'Marie Skłodowska Curie',
            about: 'Physicist and Chemist'
        })
    })
    .then((res) => {
        return res.json();
    });
}

const editProfileForm = document.querySelector('form[name="edit-profile"]');

editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = editProfileForm.querySelector('#name-input');
    const aboutInput = editProfileForm.querySelector('#description-input');

    const name = nameInput.value;
    const about = aboutInput.value;

    updateProfileData(name, about)
        .then((userData) => {
            console.log('Данные профиля обновлены:', userData);
            updateProfileOnPage(userData);
            closePopup(editProfileForm);
        })
        // .catch((err) => {
        //     console.error('Ошибка при обновлении профиля:', err);
        // });
});

function updateProfileOnPage(userData) {
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
};