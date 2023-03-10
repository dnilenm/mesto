
// массив с данными о карточках
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Крым',
        link: 'https://images.unsplash.com/photo-1599758417353-3b66f35e5d79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
    }
  ];


function addLikeEvent(card) {
    let cardLike = card.querySelector('.element__group');
    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__group_active');
    });
}

function addRemoveEvent(card) {
    let trashButton = card.querySelector('.element__trash');
    trashButton.addEventListener('click', function () {
        const Card = trashButton.closest('.element');
        Card.remove();
    });
}

function removeImagePopup () {
  
    popupImageWrap.classList.remove('popup_opened');
 
}
    
    
    function addOpenImagePopupEvent(card) {
        let cardImage = card.querySelector('.element__mask-group');
        cardImage.addEventListener('click', function (evt){
            
            popupImageWrap.classList.add('popup_opened', 'popup_dark');
            let popupImage = document.getElementById('popup__image');
            let popupSignature = document.querySelector('.popup__signature')
            popupImage.src = evt.target.src;
            popupSignature.innerHTML = this.parentElement.querySelector('.element__title').textContent
            
            
        
        let buttonClosedImagePopup = document.getElementById('popup-img_icon');
        buttonClosedImagePopup.addEventListener('click', removeImagePopup);
    });
}


// создает карточки 
const cardsList = document.querySelector('.elements');
const cardsTemplate = document.querySelector('.cards-template').content;

const cardCreation = (el) =>{
    const card = cardsTemplate.cloneNode(true);

    card.querySelector('.element__mask-group').src = el.link;
    card.querySelector('.element__title').textContent = el.name;
    
    // добавляем событие удаления карточки 
    addRemoveEvent(card);
    
    // добавляем событие Лайка карточки 
    addLikeEvent(card);
    
    // открываем изображения
    addOpenImagePopupEvent(card);

    
    
    cardsList.prepend(card);
    
}
initialCards.reverse().forEach (cardCreation);


let profilePopup = document.querySelector('.popup-profile');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let infoElement = document.querySelector('.profile__info');
let editProfileButtonOpenPopup = document.querySelector('.profile__info_edit-button');
let buttonClosedProfilePopup = document.getElementById('popup-profile_icon');
let buttonClosedCardsPopup = document.getElementById('popup-cards_icon');

let cardsFormElement = document.getElementById('form-cards');
let formElement = document.getElementById('form-profile');
let addCardsButtonOpenPopup = document.querySelector ('.profile__button');
let cardsPopup = document.querySelector('.popup-cards');
let cardsNameInput = document.querySelector('.cards-popup__name')
let cardsLinkInput = document.querySelector('.cards-popup__link')
let popupImageWrap = document.getElementById('popup-img-wrap');


//  работает с кнопками
// вызывает попап редактирования профиля и попап добавления карточки 
const callPopup = () => {
    profilePopup.classList.add('popup_opened');
} 
const callCardsPopup = () => {
    cardsPopup.classList.add('popup_opened');
}

const removePopup = () =>{
    profilePopup.classList.remove('popup_opened'); 
} 

const removeCardsPopup = () =>{
    cardsPopup.classList.remove('popup_opened');
}



editProfileButtonOpenPopup.addEventListener('click', callPopup);
buttonClosedProfilePopup.addEventListener('click', removePopup);
addCardsButtonOpenPopup.addEventListener ('click', callCardsPopup);
buttonClosedCardsPopup.addEventListener('click', removeCardsPopup);





// Обработчик редактирования профиля
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

// обработчик добавления карточек
const createCardButton = evt => {
    evt.preventDefault();
    let nameInputValue = cardsNameInput.value;
    let linkInputValue = cardsLinkInput.value;
    
    const newCard = {
        name: nameInputValue,
        link: linkInputValue
    }
    removeCardsPopup();
    cardCreation(newCard);
    cardsNameInput.value = '';
    cardsLinkInput.value = '';
}

cardsFormElement.addEventListener('submit', createCardButton); 






