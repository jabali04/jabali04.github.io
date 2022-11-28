
//// VARIABLES ///
let addTaskField = document.getElementById('addField');
let addTaskBtn = document.getElementById('addBtn');
let ulList = document.getElementById('mainList');
let ulListTwo = document.getElementById('completedList');
let ulListThree = document.getElementById('uncompletedList');
let deleteAllBtn = document.getElementById('deleteAllBtn');
let selectList = document.getElementById('selectList');


// EVENTS LISTENERS //
    //ADD A TASK
addTaskBtn.addEventListener('click', function(e) {
    if (addTaskField.value === '') {
        alert('Task cannot be empty.')
    } else {
        addingTask(addTaskField.value);
    }
    // RESET INPUT VALUE
    addTaskField.value = '';
    //
    e.preventDefault();
})

    // DELETE ALL TASKS
deleteAllBtn.addEventListener('click', function(e){
    deleteAll();
    e.preventDefault();
})

    // BTN ACTIONS
ulList.addEventListener('click', function(e) {
    if (e.target.matches('.btn-danger')) {
        deleteBtnAction(e.target);
    } else if (e.target.matches('.btn-secondary')) {
        editBtnAction(e.target);
    } else if (e.target.matches('.btn-success')) {
        completedBtnAction(e.target)
    } else if (e.target.matches('.btn-info')) {
        checkBtnAction(e.target)
    }
})

    // FILTERING TASKS //
selectList.addEventListener('change', function(e) {
    let liElements = document.querySelectorAll('#liElement')
    if (selectList.value == 'Two') {
        addingToCompletedUl(liElements)
    } else if (selectList.value == 'Three') {
        addingToUncompletedUl(liElements)
    } else {
    ulListTwo.classList.remove('input-block');
    ulListTwo.classList.add('input-hidden');
    ulListThree.classList.remove('input-block');
    ulListThree.classList.add('input-hidden');
    ulList.classList.remove('input-hidden');
    ulList.classList.add('input-block');

    }
})


// EXTERNAL FUNCTIONS //

////////////////////////////
function addingTask (x) {
    //CREATE ELEMENTS
    const newLiElement = document.createElement('li');
    newLiElement.classList.add('list-group-item', 'm-1', 'd-flex', 'c-1', 'justify-content-between');
    newLiElement.setAttribute('id', 'liElement')

    const newLabelElement = document.createElement('label');
    newLabelElement.classList.add('fs-5', 'c-2');
    newLabelElement.innerText = x;

    const newInputElement = document.createElement('input');
    newInputElement.setAttribute('type', 'text')
    newInputElement.classList.add('input-hidden');


    const newDivContainer = document.createElement('div');
    newDivContainer.classList.add('buttons-con', 'd-flex', 'justify-self-end')

    const newButtonElementOne = document.createElement('button');
    newButtonElementOne.classList.add('btn', 'btn-success', 'completed-img-bk', 'ms-1', 'align-self-center', 'p-3');
    const newButtonElementTwo = document.createElement('button');
    newButtonElementTwo.classList.add('btn', 'btn-secondary', 'edit-img-bk', 'ms-1', 'align-self-center', 'p-3');
    const newButtonElementThree = document.createElement('button');
    newButtonElementThree.classList.add('btn', 'btn-info', 'input-hidden', 'done-img-bk', 'ms-1', 'align-self-center', 'p-3');
    const newButtonElementFour = document.createElement('button');
    newButtonElementFour.classList.add('btn', 'btn-danger', 'delete-img-bk', 'ms-1', 'align-self-center', 'p-3');

    //Append Elements
    ulList.appendChild(newLiElement);
    newLiElement.appendChild(newLabelElement);
    newLiElement.appendChild(newInputElement);
    newLiElement.appendChild(newDivContainer);
    newDivContainer.appendChild(newButtonElementOne);
    newDivContainer.appendChild(newButtonElementTwo);
    newDivContainer.appendChild(newButtonElementThree);
    newDivContainer.appendChild(newButtonElementFour);
}
////////////////////////////
function deleteAll() {
    while (ulList.firstChild) {
        ulList.removeChild(ulList.firstChild)
    }
}
/////////BTN ACTIONS [FUNCTIONS] ///////////////////

function deleteBtnAction(e) {
    let deletedLi = e.closest('li')
    deletedLi.remove();
}

function editBtnAction (e) {
    let parentElement = e.closest('li');
    let editBtn = e.nextElementSibling;
    let editedLabel = parentElement.firstElementChild;
    let editedInput = parentElement.children[1];
    
    if (!editedInput.classList.contains('input-block')) {
    editedInput.classList.remove('input-hidden');
    editedInput.classList.add('input-block');
    editedLabel.classList.add("input-hidden");
    e.classList.remove('input-block')
    e.classList.add('input-hidden')

    editBtn.classList.add('input-block')
    editedInput.value = editedLabel.textContent
    editedLabel.textContent = '' 
    }   
}

function checkBtnAction(e) {
    let parentElement = e.closest('li')
    let editBtn = e.previousElementSibling
    let editedLabel = parentElement.firstElementChild
    let editedInput = parentElement.children[1]

    if (editedInput.classList.contains('input-block')) {
        editedInput.classList.remove('input-block');
        editedInput.classList.add('input-hidden');
        editedLabel.classList.remove("input-hidden");
        editedLabel.classList.add("input-block");
        editedLabel.textContent = editedInput.value
        editedInput.value = ''
        e.classList.remove('input-block')
        e.classList.add('input-hidden')
        editBtn.classList.add('input-block')
    }
}

function completedBtnAction(e) {
    let parentElement = e.closest('li')
    let editedLabel = parentElement.firstElementChild
    if (!editedLabel.classList.contains('line-t')) {
        editedLabel.classList.add('line-t');
    } else if (editedLabel.classList.contains('line-t')) {
        editedLabel.classList.remove('line-t');
    }
}

//// FILTER FUNCTIONS ///

function addingToCompletedUl(x) {
    while (ulListTwo.firstChild) {
        ulListTwo.removeChild(ulListTwo.firstChild)
    }
    ulList.classList.remove('input-block');
    ulList.classList.add('input-hidden');
    ulListThree.classList.remove('input-block');
    ulListThree.classList.add('input-hidden');
    for (let i = 0; i < x.length ; i++) {
        if (x[i].firstElementChild.className.match('line-t')) {
            elemnt = x[i]
            clone = elemnt.cloneNode(true)
            clone.setAttribute('id', 'other')
            ulListTwo.appendChild(clone)
        }
    }
    ulListTwo.classList.remove('input-hidden');
    ulListTwo.classList.add('input-block');
}

function addingToUncompletedUl(x) {
    while (ulListThree.firstChild) {
        ulListThree.removeChild(ulListThree.firstChild)
    }
    ulList.classList.remove('input-block');
    ulList.classList.add('input-hidden');
    ulListTwo.classList.remove('input-block');
    ulListTwo.classList.add('input-hidden');
    for (let i = 0; i < x.length ; i++) {
        if (!x[i].firstElementChild.className.match('line-t')) {
            elemnt = x[i]
            clone = elemnt.cloneNode(true)
            clone.setAttribute('id', 'other')
            ulListThree.appendChild(clone)
        }
    }
    ulListThree.classList.remove('input-hidden');
    ulListThree.classList.add('input-block');
}