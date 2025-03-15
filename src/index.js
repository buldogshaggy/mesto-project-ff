import './pages/index.css';
import { openPopup, closePopup, handleOverlayClick } from './components/modal.js';
import { enableValidation, clearValidation} from './components/validation.js';
import { loadUserProfile, loadCards, updateProfileData, addCard, deleteCard, removeLike, addLike, updateAvatar} from './components/api.js';
import { createCard } from './components/card.js';

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

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image-avatar');

let userId = null;

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

// newPlaceForm.addEventListener('submit', addCard);

//Дабовляем анимацию
popups.forEach((element) => element.classList.add('popup_is-animated'));

//Передаем в поля уже имеющуюся информацию
nameInput.value = nameElement.textContent;
jobInput.value = jobElement.textContent;

export const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

enableValidation(formValidationConfig);

// Отображение карточек на странице
function renderCards(cards, containerSelector, userId) {
    const cardsContainer = document.querySelector(containerSelector);

    cards.forEach((cardData) => {
        const cardElement = createCard(cardData, userId);
        cardsContainer.append(cardElement);
    });
};

// Инициализация загрузки и отображения карточек
Promise.all([loadUserProfile(), loadCards()])
    .then(([userData, cards]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.src = userData.avatar;
        userId = userData._id;
        // Отображаем карточки, передавая _id пользователя
        renderCards(cards, '.places__list', userData._id);

    })
    .catch((err) => {
        console.error('Ошибка при загрузке данных:', err);
    });

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
});

function updateProfileOnPage(userData) {
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
};

newPlaceForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = editProfileAvatarForm.querySelector('.popup__button');
    const initialButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const cardName = newPlaceForm.querySelector('.popup__input_type_card-name').value;
    const cardLink = newPlaceForm.querySelector('.popup__input_type_url').value;

    addCard(cardName, cardLink)
        .then((cardData) => {
            const cardElement = createCard(cardData, userId);
            
            const cardsContainer = document.querySelector('.places__list');
            cardsContainer.prepend(cardElement);
            closePopup(newPlaceForm);
        })
        .finally(() => {
            submitButton.textContent = initialButtonText; // Возвращаем исходный текст кнопки
          });
});

const profileAvatar = document.querySelector('.profile__image');
const editProfileAvatarForm = document.querySelector('.popup_type_edit_avatar');
const editAvatarInput = editProfileAvatarForm.querySelector('.popup__input_type_avatar');

profileAvatar.addEventListener('click', () => {
    openPopup(editProfileAvatarForm);
});

editProfileAvatarForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitButton = editProfileAvatarForm.querySelector('.popup__button');
    const initialButtonText = submitButton.textContent;
    submitButton.textContent = 'Сохранение...';

    const avatarUrl = editAvatarInput.value;

    updateAvatar(avatarUrl)
        .then((data) => {
            // Обновляем аватар на странице
            const profileImage = document.querySelector('.profile__image-avatar');
            profileImage.src = data.avatar;

            closePopup(editProfileAvatarForm);
            loadUserProfile();
        })
        .finally(() => {
            submitButton.textContent = initialButtonText; // Возвращаем исходный текст кнопки
          });

});