const card = {
    cardString: `<div class="card text-bg-primary mb-4" style="max-width: 18rem;">
                    <div class="card-header">
                        <div class="row">
                            <div class="col cardDate"></div>
                            <div class="col text-end">
                                <i class="fa-solid fa-pen-to-square mx-3" data-bs-toggle="modal" data-bs-target="#updateTask"></i>
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                    <h5 class="card-title mb-3 cardTitle"></h5>
                    </div>
                  </div>`,
    convertStringToHTML: function (str, id) {
        const parser = new DOMParser();
        const parsedString = parser.parseFromString(str, 'text/html');
        parsedString.body.firstChild.setAttribute('id', id);
        return parsedString.body.firstChild;
    }
}

const addTodoBtn = document.querySelector('#addTodoBtn');
const mainBody = document.querySelector('#mainBody');
const modal = document.querySelector('#Modal');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const date = document.querySelector('#date');
const title = document.querySelector('#title');
const saveTodo = document.querySelector('#save');
const update = document.querySelector('#update');
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const today = day + '/' + month + '/' + year;
const todoList = [];
//for update modal
const dateInputUpdated = document.getElementById('dateInputUpdated');
const titleInputUpdated = document.getElementById('titleInputUpdated');
const key = document.getElementById('key');

function validateModal() {
    if (title.value) {
        const cardData = {};
        //setting date
        if (date.value) {
            const str = date.value.split('-');
            cardData.date = str[2] + '/' + str[1] + '/' + str[0];
        } else {
            cardData.date = today;
        }
        //seeting title
        cardData.title = '💡 ' + title.value;
        //checking for todoList key
        if (localStorage.getItem('todoList')) {
            const todoList = JSON.parse(localStorage.getItem('todoList'));
            todoList.push(cardData);
            const data = JSON.stringify(todoList);
            localStorage.setItem('todoList', data)
            resetModal();
            hideModal(saveTodo);
            showTodos();
        } else {
            const todoList = [cardData];
            localStorage.setItem('todoList', JSON.stringify(todoList));
            resetModal();
            hideModal(saveTodo);
            showTodos();
        }
    } else {
        msg1.innerText = 'Title can not be empty';
    }
}


function resetModal() {
    date.value = '';
    title.value = '';
    msg1.innerText = '';
}

function hideModal(modal) {
    modal.setAttribute('data-bs-dismiss', 'modal');
    modal.removeEventListener('click', validateModal);
    modal.click();
    modal.addEventListener('click', validateModal);
    modal.removeAttribute('data-bs-dismiss');
}

function createCard(arr, id) {
    const newCard = card.convertStringToHTML(card.cardString, id);
    //adding event listener on edit icon 
    newCard.children[0].children[0].children[1].children[0].addEventListener('click', editCard);
    //adding event listener on cross/delete icon 
    newCard.children[0].children[0].children[1].children[1].addEventListener('click', deleteCard);
    newCard.querySelector('.col').textContent = `Date: ${arr[id].date}`;
    newCard.querySelector('.card-body').children[0].innerText = arr[id].title;
    return newCard;
}

function deleteCard() {
    const id = parseInt(this.parentElement.parentElement.parentElement.parentElement.getAttribute('id'));
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    todoList.splice(id, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    showTodos();
}

function showTodos() {
    const list = localStorage.getItem('todoList');
    if (list) {
        const todoList = JSON.parse(list);
        if (todoList.length !== 0) {
            mainBody.textContent = '';
            for (let i = 0; i < todoList.length; i++) {
                const card = createCard(todoList, i);
                mainBody.appendChild(card);
            }
        } else {
            mainBody.textContent = "NO TODO's";
        }
    } else {
        mainBody.textContent = "NO TODO's";
    }
}

function getName() {
    if (localStorage.getItem('name')) {
        const name = localStorage.getItem('name');
        document.getElementById('name').innerText = name;
    } else {
        document.getElementById('triggerBtn').click();
        const saveName = document.getElementById('saveName')
        saveName.addEventListener('click', function () {
            const name = document.getElementById('myInput').value;
            if (name) {
                localStorage.setItem('name', name);
                document.getElementById('name').innerText = name;
                hideModal(saveName);
            } else {
                document.getElementById('msg3').innerText = 'Please enter your name';
            }
        });
    }
}

function editCard() {
    //getting card id which was dynamically added
    const id = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    const card = this.parentElement.parentElement.parentElement.parentElement;
    //formatting date here
    const cardDate = card.querySelector('.cardDate').innerText.slice(6);
    const cardTitle = card.querySelector('.cardTitle').innerText;
    const newDate = cardDate.split('/')
    const formattedDate = newDate[2] + '-' + newDate[1] + '-' + newDate[0];
    dateInputUpdated.value = formattedDate
    titleInputUpdated.value = cardTitle;
    key.value = id;
}

function validateUpdateModal() {
    if (titleInputUpdated.value) {
        const cardData = {};
        //setting date
        if (dateInputUpdated.value) {
            const str = dateInputUpdated.value.split('-');
            cardData.date = str[2] + '/' + str[1] + '/' + str[0];
        } else {
            cardData.date = today;
        }
        //seeting title
        //checking for bulb icon
        if (titleInputUpdated.value.includes('💡')) {
            cardData.title = titleInputUpdated.value;
        } else {
            cardData.title = '💡 ' + titleInputUpdated.value;
        }
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        todoList[parseInt(key.value)] = cardData;
        localStorage.setItem('todoList', JSON.stringify(todoList));
        hideModal(update);
        showTodos();
    } else {
        msg2.innerText = 'Title can not be empty';
    }
}

saveTodo.addEventListener('click', validateModal);
update.addEventListener('click', validateUpdateModal);
showTodos();
window.onload = getName();