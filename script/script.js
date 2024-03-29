let popups = document.querySelectorAll('.popup');

// для карточек
const cardsList = document.querySelector('.elements');
const cardsTemplate = document.querySelector('.cards-template').content;
let cardsFormElement = document.getElementById('form-cards');
let addCardsButtonOpenPopup = document.querySelector ('.profile__button');
let cardsPopup = document.querySelector('.popup-cards');
let cardsNameInput = document.querySelector('.cards-popup__name')
let cardsLinkInput = document.querySelector('.cards-popup__link')

// для попапа с редактированием профиля
let profilePopup = document.querySelector('.popup-profile');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let infoElement = document.querySelector('.profile__info');
let editProfileButtonOpenPopup = document.querySelector('.profile__info_edit-button');
let buttonClosedProfilePopup = document.getElementById('popup-profile_icon');
let profileFormElement = document.getElementById('form-profile');

// для попапа с иображением
let buttonClosedCardsPopup = document.getElementById('popup-cards_icon');
let popupImageWrap = document.getElementById('popup-img-wrap');


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

  const togglePopup = (popupElement, classToAdd) => {
    popupElement.classList.toggle(classToAdd);
  };


  editProfileButtonOpenPopup.addEventListener('click', () => togglePopup(profilePopup, 'popup_opened'));
  buttonClosedProfilePopup.addEventListener('click', () => togglePopup(profilePopup, 'popup_opened'));

  addCardsButtonOpenPopup.addEventListener('click', () => togglePopup(cardsPopup, 'popup_opened'));
  buttonClosedCardsPopup.addEventListener('click', () => togglePopup(cardsPopup, 'popup_opened'));





popups.forEach(addEventClose);



function addEventClose(element) {
    element.addEventListener('click', function (event) {
        const outsideDiv = element.querySelector('.popup__container');
        const clickedElement = event.target;

        // Проверяем, что кликнули не на элементе внутри нашего div
        const isClickInsideDiv = outsideDiv.contains(clickedElement);

        if (!isClickInsideDiv) {
            togglePopup(element, 'popup_opened');
            // Выполняем действия, если кликнули за пределами div
        }
    });
}


addEventEscClose();


function addEventEscClose() {
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            popups.forEach(function (element) {
                if (element.classList.contains('popup_opened')) {
                    togglePopup(element, 'popup_opened');
                }
            });
        }
    });
}

// функция добавления лайка
function addLikeEvent(card) {
    let cardLike = card.querySelector('.element__group');
    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__group_active');
    });
}

// функция удаления карточки
function addRemoveEvent(card) {
    let trashButton = card.querySelector('.element__trash');
    trashButton.addEventListener('click', function () {
        const Card = trashButton.closest('.element');
        Card.remove();
    });
}

// функция закрытия попапа с изображением
function removeImagePopup () {
    togglePopup(popupImageWrap,'popup_opened');
}   

// функция открытия попапа с изображением
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


// общая функция взаимодействия с карточкой
const cardCreation = (el) =>{
    // создаем карточки
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






// Обработчик редактирования профиля
function handleFormSubmit (evt) {
    evt.preventDefault(); 

    let jobInputValue = jobInput.value;
    let nameInputValue = nameInput.value;
                                                
    // Выберите элементы, куда должны быть вставлены значения полей
    let nameTitle = document.querySelector ('.profile__title');
    let jobTitle = document.querySelector ('.profile__subtitle');

    // Вставьте новые значения с помощью textContent
    nameTitle.textContent = nameInputValue;
    jobTitle.textContent = jobInputValue;
    togglePopup(profilePopup, 'popup_opened');
}
// Вызов обработчика по редактированию профиля
profileFormElement.addEventListener('submit', handleFormSubmit); 

// обработчик добавления карточек
const createCardButton = evt => {
    evt.preventDefault();
    let nameInputValue = cardsNameInput.value;
    let linkInputValue = cardsLinkInput.value;
    const newCard = {
        name: nameInputValue,
        link: linkInputValue
    }
    togglePopup(cardsPopup, 'popup_opened');
    cardCreation(newCard);
    cardsNameInput.value = '';
    cardsLinkInput.value = '';
}

// Вызов обработчика по добавлению карточек
cardsFormElement.addEventListener('submit', createCardButton); 


