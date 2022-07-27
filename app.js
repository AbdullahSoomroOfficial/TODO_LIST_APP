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


function modalReset() {
    date.value = '';
    title.value = '';
    description.value = '';
}

function hideModal() {
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    body.style = 'none';
}

saveTodo.addEventListener('click', function () {
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
        hideModal();
        modalReset();
    } else {
        msg1.innerText = 'Title can not be empty';
    }
});

// addTodoBtn.addEventListener('click', function() {
//     const today = (currentDate.getMonth() + 1) + '-' + currentDate.getDate() + '-' + currentDate.getFullYear();
//     date.value = today;
//     console.log(today)
// });