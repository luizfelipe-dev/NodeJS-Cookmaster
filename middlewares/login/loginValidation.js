const usersServices = require('../../services/usersServices');
const errorsMessage = require('./loginErrors');

const { invalid } = errorsMessage;

// Função que veririca se o usuário existe e se a senha é válida
const invalidLogin = async (email, password) => {
  const result = await usersServices.getByProperty('email', email);
  if (result === null) { return true; } // Se o email não existir, retorna null
  if (result.password !== password) { return true; }
  return false;
};

// Middleware que o login do usuário pelo email e password
const loginValidation = async (req, res, next) => {
  let errorCode;
  const { email, password } = req.body;
  try {
    if (await invalidLogin(email, password)) {
      errorCode = invalid.email.code;
      throw new Error(invalid.email.message);
    }
  } catch (error) {
    return res.status(errorCode).json({ message: error.message });
  }
  next();
};

module.exports = { loginValidation };
