const jwt = require('jsonwebtoken');
const { getUser } = require('../models/userModel');

const key = 'yourSecretToken';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ message: 'malformed' }); }
  try {
    const decoded = jwt.verify(token, key);
    const user = await getUser({ email: decoded.data.email, password: decoded.data.password });
    if (!user) {
      return res.status(401).json({ message: 'JWT' }); 
    }

    req.user = user;

    next();
  } catch (_err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;
