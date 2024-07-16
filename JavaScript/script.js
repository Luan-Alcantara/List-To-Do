//Variaveis criadas para os elementos HTML//
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")

const saveTodo = (text) =>{
    const todo = document.createElement("div") // Vai criar uma div para o h3 //
    todo.classList.add("todo") // Vai inserir um id a div //

    const todoTitle = document.createElement("h3") // Vai add um h3 a div criada //
    todoTitle.innerText = text; // texto que recebe da funcao //
    todo.appendChild(todoTitle) // vai add na div todo, o elemento criado //

    // Botao done //
    const doneBtn = document.createElement("button") // vai criar um botao //
    doneBtn.classList.add("finish-todo") // vai inserir um id a div //
    doneBtn.innerHTML = '<i class="fi fi-bs-check"></i>' // vai add o icone no butao criado //
    todo.appendChild(doneBtn) // vai add na  diiv todo, o elemento criado //

    // Botao edit //

    const editBtn = document.createElement("button") // vai criar um botao //
    editBtn.classList.add("edit-todo") // vai inserir um id a div //
    editBtn.innerHTML = '<i class="fi fi-sr-pencil"></i>' // vai add o icone no butao criado //
    todo.appendChild(editBtn) // vai add na  diiv todo, o elemento criado //

    // Botao finish // 

    const deleteBtn = document.createElement("button") // vai criar um botao //
    deleteBtn.classList.add("remove-todo") // vai inserir um id a div //
    deleteBtn.innerHTML = '<i class="fi fi-bs-remove-folder"></i>' // vai add o icone no butao criado //
    todo.appendChild(deleteBtn) // vai add na  diiv todo, o elemento criado //

    todoList.appendChild(todo) // vai add o todo, na lista geral (todoList)
    todoInput.value = ""
    todoInput.focus()
}
const toggleForm = () =>{
    todoForm.classList.toggle("hide") // O que estiver escondido ela vai mostrar, e ao contrario tambem //
    todoList.classList.toggle("hide") // O que estiver escondido ela vai mostrar, e ao contrario tambem //
}

todoForm.addEventListener("submit", (e) =>{
    e.preventDefault(); // Nao vai permitir enviar o formulario //
    
    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e) =>{ // todo o elemento vai ser clicavel //
    const targetEl = e.target // vai permitir identificar e pegar qual elemento foi clicado
    const parentEl = targetEl.closest("div") // vai permitir que as alteracoes sejam aplicadas a tag pai, mais proxima

    if(targetEl.classList.contains("finish-todo")){// a funcao = contains, vai verificar se o elemento clicado tem a class = finish-todo
        parentEl.classList.toggle("done")
    }
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove()
    }
    if(targetEl.classList.contains("edit-todo")){
        toggleForm() // Vai esconder um formulario e mostrar outro //
    }
})

// Cancel edit //
cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault()

    toggleForm()
})

