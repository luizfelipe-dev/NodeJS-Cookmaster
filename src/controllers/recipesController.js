const recipesService = require('../services/recipesServices');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.payload;
  const userId = _id;
  const { err, recipe } = await recipesService
    .createRecipe(name, ingredients, preparation, userId);
  if (err) return res.status(err.status).json({ message: err.message });
  return res.status(201).json({ recipe });
};

const getAll = async (req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(200).json(recipes);
};

module.exports = {
  create,
  getAll,
}; 