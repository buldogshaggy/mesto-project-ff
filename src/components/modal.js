import { cardImagePopup, imageSrc, imageTitle, nameInput, jobInput, editProfilePopup } from "../index.js";

//Функция открытия попапа
export function openPopup(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
};

//Функция закрытия попапа
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    };
};

export function handleOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
        e.currentTarget.classList.remove('popup_is-opened');
    };
};

export function handleOpenImg(event) {
    imageSrc.src = event.target.src
    imageTitle.textContent = event.target.alt
    openPopup(cardImagePopup)
};

//Отправка формы и закрытие попапа
export function handleFormSubmit(evt) {
    evt.preventDefault(evt);

//Получили значения полей
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

//Куда будем подставлять значения
    const nameElement = document.querySelector('.profile__title');
    const jobElement = document.querySelector('.profile__description');

//Вставили новые значения
    nameElement.textContent = nameValue;
    jobElement.textContent = jobValue;

//Закрыли попап
    closePopup(editProfilePopup);
};