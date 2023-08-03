let todoDatabase = []

let todoId = 1
module.exports = {
  addTodo: (req, res) => {
    const {todoName, todoNotes} = req.body;
    const newObj = {
        todoId: todoId,
        todoName: todoName,
        todoNotes: todoNotes,
    };
    todoDatabase.push(newObj)
    todoId++
    res.status(200).send(todoDatabase);
  },

  getTodo: (req, res) => {
    res.status(200).send(todoDatabase)
  },

  deleteTodo: (req, res) => {
    todoDatabase = [];
    res.status(200).send(todoDatabase)
  },

  deleteTodoContent: (req, res) => {
    const todoId = parseInt(req.params.id);
    todoDatabase = todoDatabase.filter((todo) => todo.todoId !== todoId)
    res.status(200).send(todoDatabase)
  },
};