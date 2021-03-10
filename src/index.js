const express = require('express');

const app = express();

app.use(express.json());

const courses = ['Curso 1', 'Curso 2', 'Curso 3'];

app.get('/courses', (request, response) => {
  return response.json(courses);
});

app.get('/courses/:id', (request, response) => {
  const { id } = request.params;

  if(id === 0 || id > courses.length) {
    return response.status(404).json({ message: 'Not Found'})
  }

  return response.json(courses[id - 1]);
});

app.post('/courses', (request, response) => {
  const { name } = request.body;

  courses.push(name);

  return response.json({ name })
})

app.put('/courses/:id', (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  if(id > 0 && id <= courses.length) {
    courses[id - 1] = name;
  }

  return response.status(204).send();
})

app.delete('/courses/:id', (request, response) => {
  const { id } = request.params;

  if(id > 0 && id <= courses.length) {
    courses.splice(id - 1, 1);
  }

  return response.status(204).send();
})

app.listen(3333, () => console.log('Server is running'))