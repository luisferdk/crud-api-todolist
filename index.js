const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 0, description: 'trabajo', completado: true },
  { id: 1, description: 'ejercicio', completado: false },
  { id: 2, description: 'tareas', completado: false },
  { id: 3, description: 'leer', completado: true },
  { id: 4, description: 'practicar futbol', completado: false },
  { id: 5, description: 'jugar', completado: false }
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
    description: req.body.description,
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
          description: req.body.description ? req.body.description : task.description,
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
app.listen(9000, () => {
  console.log('Server is listening on port http://localhost:9000');
});
