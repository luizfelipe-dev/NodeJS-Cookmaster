// const { validationResult } = require('express-validator');
const validate = require('../schemas/validate');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  // const validation = validationResult(req);
  // if (!validation.isEmpty()) {
  //   return res.status(401).json({ message: validation.array()[0].msg });
  // }

  const validation = validate.login(email, password);

  if (validation.message) {
    return res.status(401).json({ message: validation.message });
  }

  next();
};
