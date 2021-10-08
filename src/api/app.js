const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const usersRouter = require('../routes/usersRouter');
const recipesRouter = require('../routes/recipesRouter');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(usersRouter);
app.use(recipesRouter);

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', '/pages', '/index.html'));
});

app.use('*', (_req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', '/pages', '/notFound.html'));
});

module.exports = app;
