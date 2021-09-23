const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('../routes/usersRoutes');
const loginRoutes = require('../routes/loginRoutes');

const app = express();
app.use(bodyParser.json());
// utilizar rotas
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
