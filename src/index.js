import './pages/index.css';
import { createCard, handleLike } from './components/card.js';
import { openPopup, closePopup, handleOverlayClick } from './components/modal.js';
import { initialCards } from './scripts/cards.js';

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
function prepareCards() {
    initialCards.forEach((x) => {
        const cardElement = createCard(x.name, x.link, handleLike, handleOpenImg);
        container.append(cardElement);
    });
};

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

    closePopup(newPlaceForm);
};

prepareCards();