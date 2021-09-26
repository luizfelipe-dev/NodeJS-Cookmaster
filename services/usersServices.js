const usersModels = require('../models/usersModels');

const getAll = async () => {
  const users = await usersModels.getAll();
  return users;
};

const getById = async (id) => {
  const user = await usersModels.getById(id);
  return user;
};

const getByProperty = async (property, value) => {
  const user = await usersModels.getByProperty(property, value);
  return user;
};

const create = async (name, quantity) => {
  const user = await usersModels.create(name, quantity);
  return user;
};

module.exports = { getAll, getById, getByProperty, create };