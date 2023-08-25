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
    let todolist = { todolist: results.rows };
    res.status(200).json(todolist);
  });
};

const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM todolist WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length > 0) res.status(200).json(results.rows);
    else {
      res.status(204).send(); //`Todo with ID: ${id} does not exist!`
    }
  });
};

const createTodo = (req, res) => {
  const { task, completed } = req.body;
  pool.query(
    "INSERT INTO todolist (task, status) VALUES ($1, $2) RETURNING *",
    [task, completed ? "completed" : "not completed"],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Todo added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  let { task, completed } = req.body;

  pool.query(
    "UPDATE todolist SET task = $1, status = $2 WHERE id = $3",
    [task, completed ? "completed" : "not completed", id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(req.body);
    }
  );
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM todolist WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Todo deleted with ID: ${id}`);
  });
};

module.exports = {
  getTasks,
  getTaskById,
  createTodo,
  updateTodo,
  deleteTodo,
};
