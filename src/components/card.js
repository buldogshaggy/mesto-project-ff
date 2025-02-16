import { container, cardNameInput, cardImgUrlInput, newPlaceForm, handleOpenImg } from '../index.js';
import { closePopup } from './modal.js';

//Темплейт карточки
function getTemplate() {
    return document.getElementById('card-template');
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
    const likeButton = clone.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeHandler);

    //Обработчикк клика по иконке лайка с колбеком
    image.addEventListener('click', openImgHandler);

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