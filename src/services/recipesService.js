const recipeModel = require('../models/recipesModel');

const verify = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      code: 400,
      message: 'Invalid entries. Try again.',
    };
  }
  return {};
};

const createRecipe = async ({ name, ingredients, preparation }) => {
  const recipe = {
    name,
    ingredients,
    preparation,
    userId: 'userId',
  };
  const verifica = verify(name, ingredients, preparation);
  if (verifica.message) return verifica;
  const create = await recipeModel.createRecipe(recipe);
  return create;
};

const getRecipes = async () => {
  const recipes = await recipeModel.getRecipes();
  return recipes;
};

const getRecipeById = async (_id) => {
  const findId = await recipeModel.getRecipeById(_id);
  if (!findId) {
    return {
      code: 404,
      message: 'recipe not found',
    };
  }
  return findId;
};

module.exports = { createRecipe, getRecipes, getRecipeById };
