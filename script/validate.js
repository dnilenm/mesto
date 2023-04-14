

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('form__input_type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_error_active');
}
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type-error');
    errorElement.classList.remove('popup__input_error_active');
    errorElement.textContent = '';
}

const checkValidityInput = (formElement, inputElement) => {
    if (!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else{
        hideInputError(formElement, inputElement);
    }
}

const hasInvalidInput = (inputList) =>{
    return inputList.some((inputElement) => {
        return (!inputElement.validity.valid)
    })
}
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)){
        buttonElement.classList.add('button_inactive');
        buttonElement.disabled = true
        
    }
    else{
        buttonElement.classList.remove('button_inactive');
        buttonElement.disabled = false
       
    }
}
const setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'))
    const buttonElement = formElement.querySelector('.popup__submit')
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
inputElement.addEventListener('input', function(){
    checkValidityInput(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
})
    })
}


const enableValidation = () =>{
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt){
            evt.preventDefault();
        })

        setEventListener(formElement)
    })
}
enableValidation();
