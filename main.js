//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

    

// Functions
function addTodo(event){
    // PREVENT FORM FROM SUBMITTING
    event.preventDefault();
    // TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCALSTORAGE
    saveLocaltodos(todoInput.value);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // EDIT BUTTON
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    // CHECK DELETE BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    // CLEAR TODO INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    // DELETE TODO
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }

    // CHECK MARK
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

    // EDIT TODO
    if(item.classList[0] === "edit-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("edit");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){todo.style.display = 'flex';
            }else{
                todo.style.display = "none";
            }
                break;
            case "pending":
                if(!todo.classList.contains("completed")){
                todo.style.display = 'flex';
            }else{
                todo.style.display = "none";
            }
                break;
        }

    });
}

function saveLocaltodos(todo){
    // CHECK EXISTING LOCAL STORAGE
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
        // CHECK EXISTING LOCAL STORAGE
        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo){
            // Todo DIV
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            // Create LI
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);

            // CHECK MARK BUTTON
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            // EDIT BUTTON
            const editButton = document.createElement('button');
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.classList.add("edit-btn");
            todoDiv.appendChild(editButton);

            // CHECK DELETE BUTTON
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.classList.add("delete-btn");
            todoDiv.appendChild(deleteButton);
            // APPEND TO LIST
            todoList.appendChild(todoDiv);
        });
}

function removeLocalTodos(todo){
    // CHECK EXISTING LOCAL STORAGE
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
