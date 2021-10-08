const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const usersRouter = require('../routes/usersRouter');
const recipesRouter = require('../routes/recipesRouter');

const app = express();
app.use(bodyParser.json());
app.use(cors);
app.use(usersRouter);
app.use(recipesRouter);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('*', (_req, res) => {
  res.status(404).send('<h3>Page Not Found</h3>');
});

module.exports = app;
