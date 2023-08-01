const { default: axios } = require("axios")

const baseUrl = `http://localhost:5001`
const newTodo = document.getElementById('newTodo')
const todoDetails = document.getElementById('todoDetails')
const addToList = document.querySelector("#addToList")

const deleteTodo = () => {
  axios
  .delete(`${baseUrl}/api/todo`)
  .then((res) => todoItem(res.data))
  .catch((err) => console.log(err))
}