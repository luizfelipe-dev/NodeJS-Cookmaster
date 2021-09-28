const recipeService = require('../services/recipeService');

const createRecipeController = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;

    const recipe = await recipeService
        .createRecipeService(name, ingredients, preparation, userId);

    return res.status(recipe.status).json(recipe.message);
};

const getAllRecipesController = async (req, res) => {
    const recipes = await recipeService.getAllRecipesService();
    return res.status(200).json(recipes);
};

const getRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeByIdService(id);
    return res.status(recipe.status).json(recipe.message);
};

const editRecipeController = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { userId, role } = req.user;
    const params = { id, name, ingredients, preparation, userId, role };
    
    const recipe = await recipeService
        .editRecipeService(params);
    res.status(recipe.status).json(recipe.message);
};

const deleteRecipeController = async (req, res) => {
    const { id } = req.params;
    const { userId, role } = req.user;
    const recipe = await recipeService.deleteRecipeService(id, userId, role);
    res.status(recipe.status).json(recipe.message);
};

const uploadRecipeImageController = async (req, res) => {
    const { id } = req.params;
    const { role, userId } = req.user;
    const path = `src/uploads/${id}.jpeg`;
    const uploadImage = await recipeService.uploadRecipeImageService(id, path, userId, role);
    res.status(uploadImage.status).send(uploadImage.message);
};

module.exports = {
    createRecipeController,
    getAllRecipesController,
    getRecipeByIdController,
    editRecipeController,
    deleteRecipeController,
    uploadRecipeImageController,
};