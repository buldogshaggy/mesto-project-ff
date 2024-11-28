const container = document.getElementById('card-container');

//Темплейт карточки
function getTemplate() {
    return document.getElementById('card-template');
};

//Выводим карточки
function prepareCards() {
    const cardTemplate = getTemplate();

    initialCards.forEach((x) => {
        const cardElement = createCard(x.name, x.link);
        container.append(cardElement);
    });
};

prepareCards();

//Создаем карточки
function createCard(name, link, deleteCard) {
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
    deleteButton.addEventListener('click', function() {
        const listItem = deleteButton.closest('.card');
        listItem.remove();
    });

    return clone;
};
