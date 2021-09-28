const { Router } = require('express');

const { getAllRecipes } = require('../middlewares/recipes/getAllRecipes');
const { getRecipeById } = require('../middlewares/recipes/getRecipeById');

const router = Router();

router.get('/',
getAllRecipes,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
http GET :3000/recipes/
*/

router.get('/:id',
getRecipeById,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
http GET :3000/recipes/
*/

module.exports = router;
