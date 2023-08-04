const baseUrl = `http://localhost:5501`
const newTodo = document.getElementById('newTodo')
const todoNotes = document.getElementById('todoNotes')
const addToList = document.querySelector("#addToList")
const clearList = document.querySelector("#clearList")

const finishTodo = (todoId) => {
  const todoContent = document.querySelector(`[data-todo-id="${todoId}"]`);
  todoContent.classList.toggle("finished");
};

listItem = (todoArray) => {
  const listDisplay = document.getElementById('listDisplay')
  listDisplay.innerHTML = ``
  todoArray.forEach((todo) => {
    const todoContent = document.createElement("div")
    todoContent.innerHTML = `
    <button id= "deleteContentBtn" onclick="deleteTodoContent(${todo.todoId})">X</button>
    <header id = "todoContentHeader">
    ${todo.todoName}
    </header>
    <br>
    <div id= "todoContentNotes">
    ${todo.todoNotes}
    </div>
    <br>
    <section id = "btns">
    <button id = "finishBtn" class="no-strike-through" onclick="finishTodo(${todo.todoId})">Finished</button>
    <button id = "editBtn" class="no-strike-through" onclick="editTodo(${todo.todoId})">Edit</button>
    </section>
    `;
    todoContent.dataset.todoId = todo.todoId;
    listDisplay.appendChild(todoContent)
  })
};

const deleteTodoContent = (todoId) => {
  axios
  .delete (`${baseUrl}/api/todo/${todoId}`)
  .then ((res) => listItem(res.data))
  .catch((err) => console.log(err))
};

editTodo = (todoId) => {
  const todoContent = document.querySelector(`[data-todo-id="${todoId}"]`);
  const todoNameElement = todoContent.querySelector("#todoContentHeader");
  const todoNotesElement = todoContent.querySelector("#todoContentNotes");

  const currentTodoName = todoNameElement.innerText;
  const currentTodoNotes = todoNotesElement.innerText;

  const inputTodoName = document.createElement("input");
  inputTodoName.type = "text";
  inputTodoName.value = currentTodoName;

  const inputTodoNotes = document.createElement("textarea");
  inputTodoNotes.value = currentTodoNotes;

  todoNameElement.innerHTML = "";
  todoNameElement.appendChild(inputTodoName);

  todoNotesElement.innerHTML = "";
  todoNotesElement.appendChild(inputTodoNotes);

  const editButton = todoContent.querySelector("#editBtn");
  editButton.innerText = "Save";
  editButton.onclick = () => saveTodoChanges(todoId, inputTodoName.value, inputTodoNotes.value);
};

saveTodoChanges = (todoId, updatedTodoName, updatedTodoNotes) => {
 
  const todoContent = document.querySelector(`[data-todo-id="${todoId}"]`);
  const todoNameElement = todoContent.querySelector("#todoContentHeader");
  const todoNotesElement = todoContent.querySelector("#todoContentNotes");

 
  todoNameElement.innerHTML = updatedTodoName;
  todoNotesElement.innerHTML = updatedTodoNotes;

  const editButton = todoContent.querySelector("#editBtn");
  editButton.innerText = "Edit";
  editButton.onclick = () => editTodo(todoId);
};

const addTodo = (event) => {
  event.preventDefault();
  const todoBlock = {
    todoName: newTodo.value,
    todoNotes: todoNotes.value,
  };
  console.log(todoBlock)
  axios
  .post(`${baseUrl}/api/todo`, todoBlock)
  .then((res) => listItem(res.data))
  .catch((err) => console.log(err))
  newTodo.value = '';
  todoNotes.value = '';
};

const deleteTodo = () => {
  axios
  .delete(`${baseUrl}/api/todo`)
  .then((res) => listItem(res.data))
  .catch((err) => console.log(err))
};

addToList.addEventListener('click', addTodo)
clearList.addEventListener('click', deleteTodo)