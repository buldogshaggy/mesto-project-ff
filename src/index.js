import './pages/index.css';
import { prepareCards, addCard } from './components/card.js';
import { openPopup, closePopup, handleOverlayClick, handleFormSubmit } from './components/modal.js';

export const container = document.getElementById('card-container');

// Получаем попап с картинкой
export const cardImagePopup = document.querySelector('.popup_type_image');

// Находим поля картинки
export const imageSrc = cardImagePopup.querySelector('.popup__image');
export const imageTitle = cardImagePopup.querySelector('.popup__caption');

//Закрытие попапа по клику на оверлей, нашли оверлей
export const popups = document.querySelectorAll('.popup');

prepareCards();

const editProfileBtn = document.querySelector('.profile__edit-button');
export const editProfilePopup = document.querySelector('.popup_type_edit');


const closeBtn = document.querySelectorAll('.popup__close');

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

//Форма редактирования профиля
const formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
export const nameInput = formElement.querySelector('.popup__input_type_name');
export const jobInput = formElement.querySelector('.popup__input_type_description');

//Передаем в поля уже имеющуюся информацию
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;

formElement.addEventListener('submit', handleFormSubmit);

export const newPlaceForm = document.querySelector('.popup_type_new-card');
const newPlaceBtn = document.querySelector('.profile__add-button');

//Открываем форму Новое место
newPlaceBtn.addEventListener('click', () => {
    openPopup(newPlaceForm);
});

export const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
export const cardImgUrlInput = newPlaceForm.querySelector('.popup__input_type_url');

newPlaceForm.addEventListener('submit', addCard);

//Дабовляем анимацию
const allPopups = document.querySelectorAll('.popup');
allPopups.forEach((element) => element.classList.add('popup_is-animated'));