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
        if(date.value) {
            cardData.date = date.value;
        } else {
            cardData.date = today;
        }
        //seeting title
        cardData.title = title.value;
        //setting desc
        if(description.value) {
            cardData.description = description.value;
        } else {
            cardData.description = '...No Description...';
        }
        todoList.push(cardData);
        msg1.innerText = '';
        resetModal();
        hideModal();
    } else {
        msg1.innerText = 'Title can not be empty';
    }
}

function resetModal() {
    date.value = '';
    title.value = '';
    description.value = '';
}

function hideModal() {
    saveTodo.setAttribute('data-bs-dismiss', 'modal');
    saveTodo.removeEventListener('click', validateModal);
    saveTodo.click();
    saveTodo.addEventListener('click', validateModal);
    saveTodo.removeAttribute('data-bs-dismiss');
}

function createCard() {
    //work on this
}

saveTodo.addEventListener('click', validateModal);