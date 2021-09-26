const usersErrors = require('./usersErrors');

const { empyt, invalid } = usersErrors;

const empytEmail = (email) => { 
  if (!email) { return true; }
  return false;
};

function invalidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(email);
}

// Middleware para validação do email
const emailValidation = async (req, res, next) => {
  let errorCode;
  const { email } = req.body;
  try {
    if (empytEmail(email)) {
      errorCode = invalid.email.code; 
      throw new Error(empyt.email.message);
    }
    if (invalidEmail(email)) {
      errorCode = invalid.email.code;
      throw new Error(invalid.email.message);
    }
  } catch (error) {
    return res.status(errorCode).json({ message: error.message });
  }
  next();
};

module.exports = { emailValidation };
