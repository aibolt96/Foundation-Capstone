const baseUrl = `http://localhost:5501`
const newTodo = document.getElementById('newTodo')
const todoNotes = document.getElementById('todoNotes')
const addToList = document.querySelector("#addToList")
const clearList = document.querySelector("#clearList")


listItem = (todoArray) => {
  const listDisplay = document.getElementById('listDisplay')
  listDisplay.innerHTML = ``
  todoArray.forEach((todo) => {
    const todoContent = document.createElement("div")
    todoContent.innerHTML = `
    <header id = "todoContentHeader">
    ${todo.todoName}
    <button onclick="deleteTodoContent()">X</button>
    </header>
    <br>
    <div id= "todoContentNotes">${todo.todoNotes}
    <br>
    <button onclick="finishTodo(event)">Finished</button>
    <button onclick="editTodo(event)">Edit</button>
    </div>
    `
    listDisplay.appendChild(todoContent)
  })
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
};

const deleteTodo = () => {
  axios
  .delete(`${baseUrl}/api/todo`)
  .then((res) => todoItem(res.data))
  .catch((err) => console.log(err))
}

addToList.addEventListener('click', addTodo)
clearList.addEventListener('click', deleteTodo)