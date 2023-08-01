const express = require('express');
const app = express();
const controller = require('./controller');

app.use(express.static('client'));

const {getTodo, addTodo, deleteTodo} = require('./controller')

app.get("/api/todo", getTodo);
app.post("/api/todo", addTodo);
app.delete("/api/todo", deleteTodo)

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});