
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let infoElement = document.querySelector('.profile__info');
let buttonOpenPopup = document.querySelector('.profile__info_edit-button');
let buttonClosedPopup = document.querySelector('.popup__icon');
let formElement = document.querySelector('.popup__block');

function callPopup (){
    popup.classList.add('popup_opened');
} 
buttonOpenPopup.addEventListener('click', callPopup);

function removePopup (){
    popup.classList.remove('popup_opened');   
} 
buttonClosedPopup.addEventListener('click', removePopup);


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    let jobInputValue = jobInput.value;
    let nameInputValue = nameInput.value;
                                                
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameTitle = document.querySelector ('.profile__title');
    let jobTitle = document.querySelector ('.profile__subtitle');

    
    // Вставьте новые значения с помощью textContent
    nameTitle.textContent = nameInputValue;
    jobTitle.textContent = jobInputValue;
    removePopup();

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 


let likes = document.querySelectorAll('.element__group');
function putLike (){
        if (this.classList.length == 1){
            this.classList.add('element__group_active');
        }
        else
        {
            this.classList.remove('element__group_active');
        }
    

}

for (let i=0; i<likes.length; i+=1){
    likes[i].addEventListener('click', putLike)
}
