const recipesModels = require('../models/recipesModels');

const getAll = async () => {
  const recipes = await recipesModels.getAll();
  return recipes;
};

const getById = async (id) => {
  const recipe = await recipesModels.getById(id);
  return recipe;
};

const getByProperty = async (property, value) => {
  const recipe = await recipesModels.getByProperty(property, value);
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModels.create(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = { getAll, getById, getByProperty, create };