const toDoInput = document.querySelector('.todo-input');
const head=document.querySelector('h1');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));


let savedTheme=localStorage.getItem("savedTheme");
savedTheme===null ?
    changeTheme('standard')
    :changeTheme(localStorage.getItem('savedTheme'));

toDoBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement("li");
    if (toDoInput.value == "") {
        alert("Buddy! I think you forgot to enter your task");
    } else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add("todo-item");
        toDoDiv.appendChild(newToDo);

        const checked=document.createElement("button");
        checked.innerHTML='<i class="fa-solid fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn',`${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        // Append the toDoDiv to the toDoList
        toDoList.appendChild(toDoDiv);

        // Clear the input field after adding the task
        toDoInput.value = "";

    }
});

function changeTheme(color){
    localStorage.setItem("savedTheme",color);
    savedTheme=localStorage.getItem("savedTheme");
    document.body.className=color;

    // console.log(color);
        color === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

        document.querySelector('input').className = `${color}-input`;
        // Change todo color without changing their status (completed or not):
        document.querySelectorAll('.todo').forEach(todo => {
            Array.from(todo.classList).some(item => item === 'completed') ? 
                todo.className = `todo ${color}-todo completed`
                : todo.className = `todo ${color}-todo`;
        });
        // Change buttons color according to their type (todo, check or delete):
        document.querySelectorAll('button').forEach(button => {
            Array.from(button.classList).some(item => {
                if (item === 'check-btn') {
                button.className = `check-btn ${color}-button`;  
                } else if (item === 'delete-btn') {
                    button.className = `delete-btn ${color}-button`; 
                } else if (item === 'todo-btn') {
                    button.className = `todo-btn ${color}-button`;
                }
            });
        });
}

toDoList.addEventListener("click",function deletecheck(event){
    // console.dir(event.target);
    item=event.target;
    // console.log(item);
    if (item.classList[0]==="delete-btn"){
        // console.log("delete it");
        // item.parentElement.remove();
        item.parentElement.classList.add("fall");

        // removing local todos;
        removeLocalTodos(item.parentElement);

        item.parentElement.addEventListener("transitionend",function(){
            item.parentElement.remove();
        })

    }
    if (item.classList[0]==="check-btn") {
        item.parentElement.classList.toggle("completed");
    }
});

function removeLocalTodos(todo){
    //Check: if item/s are there;
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex =  todos.indexOf(todo.children[0].innerText);
    // console.log(todoIndex);
    todos.splice(todoIndex, 1);
    // console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
}