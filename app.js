import * as card from './card.js';

const addTodoBtn = document.querySelector('#addTodoBtn');
const mainBody = document.querySelector('#mainBody');
const modal = document.querySelector('#Modal');
const msg1 = document.querySelector('#msg1');
const date = document.querySelector('#date');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const saveTodo = document.querySelector('#save');
const currentDate = new Date();
const today = (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '-' + currentDate.getFullYear();
const todoList = [];

function validateModal() {
    if (title.value) {
        const cardData = {};
        //setting date
        if (date.value) {
            cardData.date = date.value;
        } else {
            cardData.date = today;
        }
        //seeting title
        cardData.title = title.value;
        //setting desc
        if (description.value) {
            cardData.description = description.value;
        } else {
            cardData.description = '';
        }
        todoList.push(cardData);
        // console.log(todoList);
        resetModal();
        hideModal();
        showTodos(todoList);
    } else {
        msg1.innerText = 'Title can not be empty';
    }
}

function resetModal() {
    date.value = '';
    title.value = '';
    description.value = '';
    msg1.innerText = '';
}

function hideModal() {
    saveTodo.setAttribute('data-bs-dismiss', 'modal');
    saveTodo.removeEventListener('click', validateModal);
    saveTodo.click();
    saveTodo.addEventListener('click', validateModal);
    saveTodo.removeAttribute('data-bs-dismiss');
}

function createCard(id){
    const newCard = card.convertStringToHTML(card.cardString, id);
    newCard.querySelector('.col').textContent = `Date: ${todoList[id].date}`;
    newCard.querySelector('.card-body').children[0].innerText = todoList[id].title;
    newCard.querySelector('.card-body').children[1].innerText = todoList[id].description;
    return newCard;
}

function showTodos(arr) {
    if(todoList.length !== 0){
        mainBody.textContent = '';
        for(let i = 0; i < arr.length ; i++) {
            const card = createCard(i);
            mainBody.appendChild(card);
            console.dir(document.body)
        }
    } else {
        mainBody.textContent = "NO TODO's";
    }
}

saveTodo.addEventListener('click', validateModal);

showTodos();