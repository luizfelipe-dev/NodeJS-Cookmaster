const recipesModel = require('../models/recipesModel');
const auth = require('../services/auth');

const createRecipe = async (req, res) => {
    const { authorization } = req.headers;
    const { name, ingredients, preparation } = req.body;
    const user = auth.validateToken(authorization);
    const { _id: id } = user;
    if (user.status) {
       return res.status(user.status).json(user.obj);
    }
    const recipe = await recipesModel.createRecipe(name, ingredients, preparation, id);
    res.status(201).json({ recipe });
};  

const getAll = async (_req, res) => {
  const recipes = await recipesModel.getAll();
  res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.getById(id);
  if (!recipe) return res.status(404).json({ message: 'recipe not found' });
  res.status(200).json(recipe);
};

module.exports = {
    createRecipe,
    getAll,
    getById,
};