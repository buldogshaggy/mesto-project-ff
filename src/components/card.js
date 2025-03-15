import { handleOpenImg } from "..";
import { deleteCard, addLike, removeLike } from "./api";

//Создаем карточки
export function createCard(cardData, userId) {
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

    cardImage.addEventListener('click', handleOpenImg);

    // Проверяем, лайкнул ли пользователь карточку
    const isLiked = cardData.likes.some((like) => like._id === userId);
    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    };

    // Показываем кнопку удаления только для своих карточек
    if (cardData.owner._id === userId) {
        deleteButton.style.display = 'block';
    } else {
        deleteButton.style.display = 'none';
    };

    // Обработчик для удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCard(cardData._id)
            .then(() => {
                cardElement.remove();
            })
    });
    // Обработчик для лайка
    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');

        if (isLiked) {
            removeLike(cardData._id)
                .then(updatedCard => {
                    likeCount.textContent = updatedCard.likes.length;
                    likeButton.classList.remove('card__like-button_is-active');
                })
        } else {
            addLike(cardData._id)
                .then(updatedCard => {
                    likeCount.textContent = updatedCard.likes.length;
                    likeButton.classList.add('card__like-button_is-active');
                })
        }
    });

    return cardElement;
};