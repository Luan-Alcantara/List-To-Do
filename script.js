// Variaveis criadas para os elementos HTML //
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Function //
const saveTodo = (text, done = 0, save = 1) => { // Criar o Template da div todo // 
  const todo = document.createElement("div"); // Criar a div //
  todo.classList.add("todo"); // Add a class na div // 

  const todoTitle = document.createElement("h3"); // Criar o titulo da tarefa //
  todoTitle.innerText = text; // Vai receber o titulo inserido no input // 
  todo.appendChild(todoTitle); // Inserir o h3 no todo // 

  const doneBtn = document.createElement("button"); // Criar o button done //
  doneBtn.classList.add("finish-todo"); // Add a class no button //
  doneBtn.innerHTML = '<i class="fi fi-bs-check"></i>'; // Add o icon //
  todo.appendChild(doneBtn); // inserir o button done no todo // 

  const editBtn = document.createElement("button"); // Criar o button edit //
  editBtn.classList.add("edit-todo"); // Add a class no button //
  editBtn.innerHTML = '<i class="fi fi-sr-pencil"></i>'; // Add o icon //
  todo.appendChild(editBtn); // Inserir o button edit no todo //

  const deleteBtn = document.createElement("button"); // criar o button delete //
  deleteBtn.classList.add("remove-todo"); // Add a class no button //
  deleteBtn.innerHTML = '<i class="fi fi-bs-remove-folder"></i>'; // Add o icon //
  todo.appendChild(deleteBtn); // Inserir o button delete no todo // 

  // Utilizando dados da localStorage
  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }

  todoList.appendChild(todo);

  todoInput.value = ""; // Vai limpar o campo de texto apos add a tarefa // 
};

const toggleForms = () => {
  // Enquanto um form estiver presente, o outro ira sumir // 
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      // Utilizando dados da localStorage
      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

const getSearchedTodos = (search) => { // Busca que o usuario ira fazer //
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase(); // Vai pesquisar o titulo inserido, idependente de CapsLock ativa ou nao //

    todo.style.display = "flex"; // A busca ira aparecer e sumir //

    console.log(todoTitle);

    if (!todoTitle.includes(search)) { // Vai verificar os input que nao tem search //
      todo.style.display = "none";
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll(".todo");
  // A estrutura de decisao validara o select clicado //
  switch (filterValue) {
    // Filtrar todas as tarefas // 
    case "all":
      todos.forEach((todo) => (todo.style.display = "flex"));

      break;
    // Filtrar tarefas feitas //
    case "done":
      todos.forEach((todo) =>
        todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;
    // Filtrar tarefas a fazer //
    case "todo":
      todos.forEach((todo) =>
        !todo.classList.contains("done")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none")
      );

      break;

    default:
      break;
  }
};

// End Functions //

// Events //
todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Nao vai permitir o envio do formulario //

  const inputValue = todoInput.value; // Valor inserido no input // 

  if (inputValue) { // Validar se o campo estiver null //
    saveTodo(inputValue);
  }
});

// Identificar qual o botao clicado //
document.addEventListener("click", (e) => {
  const targetEl = e.target; // Vai identificar qual o elemento clicado //
  const parentEl = targetEl.closest("div"); // O evento sera aplicado no elemento pai mais proximo // 
  let todoTitle; // Vai usar o titulo como base //

  if (parentEl && parentEl.querySelector("h3")) { // Validar se existe um elemento pai e um titulo //
    todoTitle = parentEl.querySelector("h3").innerText || "";
  }
  // Done Todo //
  if (targetEl.classList.contains("finish-todo")) { // Validar se o elemento clicado possui a class finish-todo //
    parentEl.classList.toggle("done"); // Vai preencher ou remover a tarefa como done // 

    updateTodoStatusLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("remove-todo")) { // Validar se o elemento clicado possui a class remove-todo //
    parentEl.remove(); // Remover tarefas //

    // Utilizando dados da localStorage
    removeTodoLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("edit-todo")) { // Validar se o elemento clicado possui a class edit-todo //
    toggleForms(); // Esconder um formulario e exibir outro // 

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

// Cancelar o formulario edit e mostrar o formulario inicial // 
cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Nao vai permitir o envio do formulario //
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Nao vai permitir o envio do formulario //

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});

searchInput.addEventListener("keyup", (e) => { // Quando a tecla for clicada, acontecera o evento //
  const search = e.target.value;

  getSearchedTodos(search); // Vai executar a busca //
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Nao vai permitir o envio do formulario //

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text != todoText);

  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();