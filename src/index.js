import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const container = document.getElementById('card-container');

//Темплейт карточки
function getTemplate() {
    return document.getElementById('card-template');
};

//Выводим карточки
function prepareCards() {
    initialCards.forEach((x) => {
        const cardElement = createCard(x.name, x.link, deleteCard);
        container.append(cardElement);
    });
};

prepareCards();

//Создаем карточки
function createCard(name, link) {
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

    return clone;
};

function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

//Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.remove('popup_is-animated');
    document.addEventListener('keydown', closeByEscape);
};

//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
};

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');


const closeBtn = document.querySelector('.popup__close');

//Обработчик клика по кнопке с карандашом
editProfileBtn.addEventListener('click', () => {
    openPopup(editProfilePopup);
});

//Обработчик клика по крестику для закрытия модалки
closeBtn.addEventListener('click', () => {
    closePopup(editProfilePopup);
});

//Закрытие попапа по клику на оверлей, нашли оверлей
const popups = document.querySelectorAll('.popup');

//поставили счетчик клика 
popups.forEach(popup => {
    popup.addEventListener('click', handleOverlayClick);
});

function handleOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
        e.currentTarget.classList.remove('popup_is-opened');
    };
};

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    };
};

//Форма редактирования профиля
const formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

//Передаем в поля уже имеющуюся информацию
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

//Отправка формы и закрытие попапа
function handleFormSubmit(evt) {
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

formElement.addEventListener('submit', handleFormSubmit);

const newPlaceForm = document.querySelector('.popup_type_new-card');
const newPlaceBtn = document.querySelector('.profile__add-button');

//Открываем форму Новое место
newPlaceBtn.addEventListener('click', () => {
    openPopup(newPlaceForm);
});