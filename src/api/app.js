const express = require('express');
const bodyParser = require('body-parser');
const usersControllers = require('../../controllers/usersControllers');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(bodyParser.json());

// Todas as rotas a partir de /user serão tratadas no usersControllers;
app.use('/users', usersControllers);

module.exports = app;
