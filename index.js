const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 0, tarea: 'trabajo', completado: true },
  { id: 1, tarea: 'ejercicio', completado: false },
  { id: 2, tarea: 'tareas', completado: false },
  { id: 3, tarea: 'leer', completado: true },
  { id: 4, tarea: 'practicar futbol', completado: false },
  { id: 5, tarea: 'jugar', completado: false }
];
let id = 6;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  let task = tasks.find((task) => task.id == req.params.id);
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: id,
    tarea: req.body.tarea,
    completado: req.body.completado
  };
  tasks = [...tasks, newTask];
  res.json({
    create: true
  });
  id++;
});

app.put('/tasks/:id', (req, res) => {
  tasks = [
    ...tasks.map((task) => {
      if (task.id == req.params.id) {
        let newTask = {
          id: task.id,
          tarea: req.body.tarea ? req.body.tarea : task.tarea,
          completado: req.body.completado ? req.body.completado : task.completado
        };
        console.log(newTask);
        return newTask;
      }
      return task;
    })
  ];
  res.json({
    update: true
  });
});

app.delete('/tasks/:id', (req, res) => {
  tasks = [...tasks.filter((task) => task.id != req.params.id)];
  res.json({
    delete: true
  });
});

// listen for requests
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
