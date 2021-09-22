const recipeModel = require('../models/recipeModel');

const createNewRecipe = async (recipe, id) => {
  const result = await recipeModel.createRecipe(recipe, id);
  return result;
};

const getAllRecipes = async () => {
  const result = await recipeModel.getAllRecipes();
  return result;
};

const getRecipeById = async (id) => {
  const result = await recipeModel.getRecipeById(id);
  return result;
};

module.exports = { 
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
};