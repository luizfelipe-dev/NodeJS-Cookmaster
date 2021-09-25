const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => {
    const { _id } = req.params;
    console.log(_id);
    return callback(null, `${_id}.jpeg`); 
  },
});

const upload = multer({ storage });

const usersControllers = require('../controllers/usersControllers');
const validateJWT = require('../middlewares/validateJWT');
const recipesControllers = require('../controllers/recipesControllers');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.resolve('uploads')));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', usersControllers.create);
app.post('/login', usersControllers.login);
app.post('/recipes', validateJWT, recipesControllers.create);
app.get('/recipes', recipesControllers.getAll);
app.post('/recipes/:_id/image',
  validateJWT, upload.single('image'),
  recipesControllers.uploadPicture);
app.get('/recipes/:_id', recipesControllers.getById);
app.put('/recipes/:_id', validateJWT, recipesControllers.update);
app.delete('/recipes/:_id', validateJWT, recipesControllers.deleteOne);
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
