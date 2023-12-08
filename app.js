// kumpulkan semua ui elemen 
const todoForm = document.querySelector("#todo-form"); 
const todoInput = document.querySelector("#todo-input"); 
const todoFilterInput = document.querySelector("#filter-input"); 
const todoList = document.querySelector("#todo-list"); 
const clearButton = document.querySelector("#collapseClearButton"); 

// ini fungsi adalah kumpulan eventListener 
immediateLoadEventListeners();  

// Load fungsi berikut begitu js di run
function immediateLoadEventListeners() { 

    //mendapatkan todos dari localStorage dan render di browser 
    document.addEventListener("DOMContentLoaded",getTodos);

    // ini adalah event untuk menambahkan todo
    todoForm.addEventListener("submit", addTodo); 
    
    // ini adalah eveent untuk menghapus 1 todo
    todoList.addEventListener("click", deletetodo); 
    
    // ini adalah event untuk menghapus semua todo
    clearButton.addEventListener("click", clearTodos); 
    
    // ini adalah event untuk memfilter todo
    todoFilterInput.addEventListener("keyup",filterTodos); 
}

// inisialisasi awal 
todoList.innerHTML="";

// Reusable Code 
function CreateElementLi(value){
    // membuat li elemen untuk membuat todo 
    const li = document.createElement("li"); 
    // menambahkan class pada elemen li
    li.className = "todo-item list-group-item d-flex justify-content-between align-items-center mb-1" 
    // menambahkan children ke dalam li 
    li.appendChild(document.createTextNode(value)) 
    // membuat delete button 
    const a = document.createElement("a") 
    // menambahkan href pada elemen a 
    a.href = "#" 
    // menambahkan class pada elemen a
    a.className = "badge badge-danger delete-todo" 
    // menambahkan children ke elemen a 
    a.innerHTML = "Delete" 
    // menambahkan elemen a ke dalam childern li 
    li.appendChild(a) 
    // menambahkan elemen li yg telah dibuat di atas ke dalam elemen todo-list 
    todoList.appendChild(li); 
} 

function addTodoFromLocalStorage(){
    let todos; 

    if(localStorage.getItem("todos") == null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    return todos;
} 


// ini adalah dom function 
function getTodos(){
    const todos = addTodoFromLocalStorage();
    todos.forEach((todo) => {
        CreateElementLi(todo); 
    })
} 

function addTodo(e){
    e.preventDefault(); 
    if(todoInput.value === "")
    {
        alert("Mohon masukkan input");
    }
    else{
    CreateElementLi(todoInput.value);
    addTodoLocalStorage(todoInput.value);
    todoInput.value = "";
    }
} 

function addTodoLocalStorage(TodoInputValue){
    const todos = addTodoFromLocalStorage();
    todos.push(TodoInputValue); 
    localStorage.setItem("todos",JSON.stringify(todos));
}

function deletetodo(e){
    e.preventDefault(); 

    //console.log(e.target); --> e.target mengarah ke delete button karena merupakan children dari elemen li(parent) 
    if(e.target.classList.contains("delete-todo")){ 
        if(confirm("Apakah anda yakin ingin menghapus ini?")) // confirm adalah dialog box yang akan ada di dalam browser
        {
            const parent = e.target.parentElement; 
            parent.remove(); 
            deleteTodoLocalStorage(parent);
        }
    }
} 

function deleteTodoLocalStorage(deletedElement){
    const todos = addTodoFromLocalStorage(); 

    todos.forEach((todo, idx) => {
        if(deletedElement.firstChild.textContent === todo){
            todos.splice(idx, 1);
        }
    }) 

    localStorage.setItem("todos",JSON.stringify(todos));
}

function clearTodos(){
    todoList.innerHTML=""; 
    clearTodoLocalStorage();
} 

function clearTodoLocalStorage(){
    const todos = addTodoFromLocalStorage(); 
    const lengthOfTodos = todos.length; 
    const firstIndex = 0;
    todos.splice(firstIndex,lengthOfTodos); 
    localStorage.setItem("todos",JSON.stringify(todos));
}

function filterTodos(e) {
    const filterText = e.target.value.toLowerCase(); 
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((item) => {
        const itemText = item.firstChild.textContent.toLowerCase(); 
        //console.log(itemText); 

        if(itemText.indexOf(filterText) != -1){
            item.setAttribute("style","display:block;"); // menambahkan atribut style ke dalam elemen html 
            // display block artinya menampilkan ke website
        } else {
            item.setAttribute("style","display:none !important;"); 
            // display none artinya tidak ditampilkan
        }
    })
    //console.log(todoItems);
} 

