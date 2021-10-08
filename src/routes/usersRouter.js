const { Router } = require('express');
const { 
    createUserController, 
    loginController,
    getAllUsersController,
    deleteUserController,
  } = require('../controllers/userController');
const validateToken = require('../middlewares/validateJWT');

const usersRouter = Router();

usersRouter.get('/getall', getAllUsersController);
usersRouter.post('/users', createUserController);
usersRouter.post('/login', loginController);
usersRouter.delete('/deleteuser/:id', validateToken, deleteUserController);

module.exports = usersRouter;