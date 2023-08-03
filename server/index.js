const express = require('express');
const cors = require('cors')

const app = express();
const controller = require('./controller');

app.use(express.static('client'));
app.use(cors())
app.use(express.json());

const {getTodo, addTodo, deleteTodo, deleteTodoContent} = require('./controller')

app.get("/api/todo", getTodo);
app.post("/api/todo", addTodo);
app.delete("/api/todo", deleteTodo)
app.delete("/api/todo/:id", deleteTodoContent)

const PORT = 5501;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});