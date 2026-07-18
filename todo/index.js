const todoList = document.getElementById('todoUL')
const input = document.getElementById('inputTxt')
const bttn = document.getElementById('addTaksBttn')

let textContent;

input.addEventListener('change',(e)=>{
    console.log('e',e.target.value)
    textContent = e.target.value
})

function createActionBttns(){
    const bttns = document.createElement('div')
    bttns.setAttribute('class','actionBttns')
    const deleteBtnn = document.createElement('button')
    deleteBtnn.setAttribute('class','deleteTask')
    const editBttn = document.createElement('button')
    editBttn.setAttribute('class','editTask')
    const completeBttn = document.createElement('button')
    completeBttn.setAttribute('class','completeTask')
    deleteBtnn.textContent = 'Delete'
    editBttn.textContent = 'Edit'
    completeBttn.textContent = 'Completed'
    // textContentOnly.textContent = todoTextContent
    bttns.append(deleteBtnn)
    bttns.append(editBttn)
    bttns.append(completeBttn)
    return bttns
}

function addTodoTaskInList(todoTextContent){
    const element = document.createElement('li')
    // const textContentOnly = document.createElement('h4')
    bttnsELement = createActionBttns()
    element.append(textContent)
    element.append(bttnsELement)
    todoList.append(element)
}
bttn.addEventListener('click',()=>{
    textContent ? addTodoTaskInList(textContent) : alert('Did Not Get Task')
})
todoList.addEventListener('click',(e)=>{
    console.log('event.target',e)
    if(e.target.className == 'deleteTask'){
        e.target.closest("li").remove();

    }
    if(e.target.className == 'editTask'){
        li = e.target.closest('li')
        console.log('lidsfads',li.childNodes)
        const inputBox = document.createElement('input')
        inputBox.setAttribute('class','newTask')
        const doneBtnn = document.createElement('button')
        doneBtnn.setAttribute('class','doneEdit')
        doneBtnn.textContent = 'Done'
        inputBox.value = li.childNodes[0].textContent
        li.replaceChild(inputBox,li.childNodes[0])
        li.replaceChild(doneBtnn,li.childNodes[1])
        console.log('afteroperation',li)
    }
    if(e.target.className == 'doneEdit'){
        li = e.target.closest('li')
        newTask = document.querySelector('.newTask')
        li.textContent = newTask.value
        console.log('li new task',li)
        bttnsELement = createActionBttns()
        li.append(bttnsELement)
        console.log('after bttn addintio',li)
    }
    if(e.target.className == 'completeTask'){
        
        li = e.target.closest('li')
        // console.log(li.childNodes[0])
        li.style.color = 'blue'
    }
})
