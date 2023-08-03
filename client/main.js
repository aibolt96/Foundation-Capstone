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
    <header id = "todoContentHeader">
    ${todo.todoName}
    <button id= "deleteContentBtn" onclick="deleteTodoContent(${todo.todoId})">X</button>
    </header>
    <br>
    <div id= "todoContentNotes">
    ${todo.todoNotes}
    </div>
    <br>
    <section id = "btns">
    <button id = "finishBtn" class="no-strike-through" onclick="finishTodo(${todo.todoId})">Finished</button>
    <button id = "editBtn" class="no-strike-through" onclick="editTodo(event)">Edit</button>
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

const editTodo = () => {

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