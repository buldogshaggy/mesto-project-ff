import { formValidationConfig } from "..";

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

export function enableValidation() {
    const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector));

    formList.forEach((formElement) => {
        setEventListener(formElement);
    });
};

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

export function clearValidation(formElement, formValidationConfig) {
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