const usersServices = require('../../services/usersServices');
const usersErrors = require('./usersErrors');

const { alreadyExists } = usersErrors;

// Função que veririca se o email já existe (se é repetido);
const emailAlreadyExists = async (email) => {
  const result = await usersServices.getByProperty('email', email);
  if (result !== null) { return true; }
  if (result === null) { return false; }
};

// Middleware que verifica se o email já existe
const emailUniqueValidation = async (req, res, next) => {
  let errorCode;
  const { email } = req.body;
  try {
    if (await emailAlreadyExists(email)) {
      errorCode = alreadyExists.email.code;
      throw new Error(alreadyExists.email.message);
    }
  } catch (error) {
    return res.status(errorCode).json({ message: error.message });
  }
  next();
};

module.exports = { emailUniqueValidation };
