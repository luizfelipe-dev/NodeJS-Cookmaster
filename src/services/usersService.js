const Users = require('../models/usersModel');

const create = async (name, email, password) => {
  const existingUser = await Users.findByEmail(email);

  if (existingUser) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Email already registered',
      },
    };
  }

  return Users.create(name, email, password);
};

module.exports = {
  create,
};