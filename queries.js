// GET: / | displayTodos()
// GET: /tasks | getTasks()
// GET: /tasks/:id | getTaskById()
// POST: /todos | createTodo()
// PUT: /todos/:id | updateTodo()
// DELETE: /todos/:id | deleteTodo()

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todo-App",
  password: "    ",
  port: 5432,
});

const getTasks = (req, res) => {
  pool.query("SELECT * FROM todolist ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getTasks,
};
