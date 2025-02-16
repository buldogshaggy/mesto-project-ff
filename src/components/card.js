import { initialCards } from '../scripts/cards.js';
import { container, cardNameInput, cardImgUrlInput, newPlaceForm } from '../index.js';
import { handleOpenImg, closePopup } from './modal.js';

//Темплейт карточки
function getTemplate() {
    return document.getElementById('card-template');
};

//Выводим карточки
export function prepareCards() {
    initialCards.forEach((x) => {
        const cardElement = createCard(x.name, x.link, handleLike, handleOpenImg);
        container.append(cardElement);
    });
};

//Создаем карточки
export function createCard(name, link, likeHandler, openImgHandler) {
    const template = getTemplate();

    //Клонируем шаблон карточки
    const clone = template.content.cloneNode(true);

    //Устанавливаем значение вложенных элементов
    const image = clone.querySelector('.card__image');
    image.src = link;
    image.alt = name;

    const titleElement = clone.querySelector('.card__title');
    titleElement.textContent = name;

    //Обработчикк клика по иконке удаления с колбеком
    const deleteButton = clone.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    //Обработчикк клика по иконке лайка с колбеком
    const likeButton = clone.querySelectorAll('.card__like-button');
    likeButton[0].addEventListener('click', likeHandler);

    //Обработчикк клика по иконке лайка с колбеком
    const cardImg = clone.querySelector('.card__image');
    cardImg.addEventListener('click', openImgHandler);

    return clone;
};

//Удаление карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

//Лайк карточки
export function handleLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
};

export function addCard(evt) {
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