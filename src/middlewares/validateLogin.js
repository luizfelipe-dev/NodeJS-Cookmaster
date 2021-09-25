const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(401).json({ message: validation.array()[0].msg });
  }

  next();
};