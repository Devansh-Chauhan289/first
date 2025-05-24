

function AddTodo(e){
    e.preventDefault();
    let todo = document.getElementById("todo-input").value;
    let date = document.getElementById("todo-date").value;
    let type = document.getElementById("todo-type").value;

    console.log(todo,date);
    let todos = localStorage.getItem("todoList")? JSON.parse(localStorage.getItem("todoList")) : [];
    localStorage.setItem("todoList",JSON.stringify([...todos,{todo,date,type,done : false}]))
    // let todos = localStorage.getItem("todoList",)
    console.log("todo added");
    alert("Todo Added");
    document.getElementById("todo-input").value = "";
    document.getElementById("todo-date").value = "";
    document.getElementById("todo-type").value = ""; 
    ShowTodos()
}

function ShowTodos(){
    let todos = localStorage.getItem("todoList")? JSON.parse(localStorage.getItem("todoList")) : [];
    console.log(todos);
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    todos.length>0 ? (
        todos.forEach((item,index) => {
        let newDate = new Date(item.date).toDateString()

        todoList.innerHTML += `
        <div class="todo-item">
        <h2> Task : ${item.todo} | Date :  ${newDate} | Category :  ${item.type} | Status : ${item.done ? "Completed":"Incomplete"}  </h2>
        
        <div class = "todo-btns>
            <label for="done">Mark As Complete </label>
            ${
                item.done ? `<input type="checkbox" checked onchange="updateTodo(${index})" name="done">` : 
                `<input type="checkbox" onchange="updateTodo(${index})" name="done">`
            }
            
            <button onclick="DeleteTodo(${index})">Delete</button>
        </div>
        
        </div>`;
    })
    ) : (
        todoList.innerHTML = `<h2> No Todos Found </h2>`
    )
    
}

function DeleteTodo(index){

    let todos = localStorage.getItem("todoList")? JSON.parse(localStorage.getItem("todoList")) : [];
    alert(todos[index].todo + " Deleted");
    todos.splice(index,1);
    localStorage.setItem("todoList",JSON.stringify(todos));
    
    ShowTodos();
    
}

function updateTodo(index){
    let todos = localStorage.getItem("todoList")? JSON.parse(localStorage.getItem("todoList")) : [];
    todos[index].done = !todos[index].done;
    localStorage.setItem("todoList",JSON.stringify(todos));
    ShowTodos();
}

function ClearTodos(){
    localStorage.removeItem("todoList");
    ShowTodos();
}

function FilterTodos(event){
    let text = event.target.value;
    let todos = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
    let filterTodo = todos.filter(item => item.todo.toLowerCase().includes(text.toLowerCase()));
    console.log(filterTodo);
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""
    filterTodo.length>0 ? (
        filterTodo.forEach((item,index) => {
        let newDate = new Date(item.date).toDateString()

        todoList.innerHTML += `
        <div class="todo-item">
            <h2> Task : ${item.todo} | Date :  ${newDate} | Category :  ${item.type} | Status : ${item.done ? "Completed":"Incomplete"}  </h2>
            
            <div class = "todo-btns">
                <label for="done">Mark As Complete 
                ${
                    item.done ? `<input type="checkbox" checked onchange="updateTodo(${index})" name="done">` : 
                    `<input type="checkbox" onchange="updateTodo(${index})" name="done">`
                }
                </label>
                <button onclick="DeleteTodo(${index})">Delete</button>
            </div>
        
        </div>
        `
    })
    ) : (
        todoList.innerHTML = `<h2> No Todos Found </h2>`
    )
    
}

function FilterCategory(event){
    let text = event.target.value;
    let todos = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
    let filterTodo = todos.filter(item => item.type.toLowerCase().includes(text.toLowerCase()));
    console.log(filterTodo);
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""
    filterTodo.length>0 ? (
        filterTodo.forEach((item,index) => {
        let newDate = new Date(item.date).toDateString()

        todoList.innerHTML += `
        <div class="todo-item">
        <h2> Task : ${item.todo} | Date :  ${newDate} | Category :  ${item.type} | Status : ${item.done ? "Completed":"Incomplete"}  </h2>
        
        <div class = "todo-btns>
            <label for="done">Mark As Complete </label>
            ${
                item.done ? `<input type="checkbox" checked onchange="updateTodo(${index})" name="done">` : 
                `<input type="checkbox" onchange="updateTodo(${index})" name="done">`
            }
            
            <button onclick="DeleteTodo(${index})">Delete</button>
        </div>
        
        </div>
        `
    })
    ) : (
        todoList.innerHTML = `<h2> No Todos Found </h2>`
    )
}

function DebounceSearch(delay,func){
    console.log("func initialized");
    let timer;
    return function(event){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func(event);
        }, delay);
        
    }
}

function ScrollToTop(){
    let container = document.getElementById("todo-list");
    let btn = document.getElementById("scroll-to-top");
    
    container.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    
}

function ThrottleButton(delay,func){
    let lastCall = 0;
    return function(...args){
        const now = new Date().getTime();
        if(now - lastCall < delay){
            console.log("not calling back to top");
            return;
        }
        console.log("calling back to top");
        lastCall = now;
        return func(...args);
    }
}

const Throttle = ThrottleButton(2000,ScrollToTop);

const debouncedFilterTodos = DebounceSearch(500, FilterTodos);

window.onload = ShowTodos;