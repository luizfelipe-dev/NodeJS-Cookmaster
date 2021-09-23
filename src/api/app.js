const express = require('express');
const bodyPaarser = require('body-parser');

const Routes = require('./routes');
const error = require('./middlewares/error');

const app = express();

app.use(bodyPaarser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

// Não remover esse end-point, ele é necessário para o avaliador
app.use('/users', Routes.users);

app.use(error);

module.exports = app;
