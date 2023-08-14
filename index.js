const app = require("express")();
const PORT = 3000;

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let todos = [
  {
    task: "grab eggs",
    completed: "false",
    id: "1",
  },
  {
    task: "buy an umbrella",
    completed: "false",
    id: "2",
  },
  {
    task: "finish project",
    completed: "false",
    id: "3",
  },
];

let count = todos.length + 1;
app.get("/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/todos", function (req, res) {
  let tasks = req.body;
  for (const task of tasks) {
    task["id"] = `${count}`;
    count += 1;
  }
  todos.push(...tasks);
  res.status(201).send(todos);
});

app.put("/todos/:id", (req, res) => {
  let id = req.params["id"];
  let newTask = todos.map((task) => {
    if (task.id === id) {
      task["task"] = req.body["task"];
      task["completed"] = req.body["completed"];
    }
  });
  res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
  let id = req.params["id"];
  let removeIndex = todos.findIndex((e) => e.id === id);
  todos.splice(removeIndex, 1);
  res.send(todos);
});
