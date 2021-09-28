const { Router } = require('express');

const { getAllRecipes } = require('../middlewares/recipes/getAllRecipes');
const { getRecipeById } = require('../middlewares/recipes/getRecipeById');
const { createRecipes } = require('../middlewares/recipes/createRecipes');
const { emptyFildValidation } = require('../middlewares/recipes/emptyFildValidation');
const { tokenValidation } = require('../middlewares/authentication/tokenValidation');

const router = Router();

router.post('/',
tokenValidation,
emptyFildValidation,
createRecipes,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
http POST :3000/recipes/ name='miojo' ingredients='macarrão, tempero' preparation='Esquenta a água e joga o tempero' id='12345' authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRmOTNkNDczMWI4OGRlNmNmYjAzZTYiLCJuYW1lIjoiRXJpY2sgSmFjcXVpbiIsImVtYWlsIjoiZXJpY2tqYWNxdWluQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjMyODAyMzM4LCJleHAiOjE2MzI5NzUxMzh9.h1xPHCPac6d7PdAFqUaZCdL2uux9rS05pYdTK-AkPno"

// BAD REQUEST
http POST :3000/recipes/ name='miojo' ingredients='macarrão, tempero' id='12345'
*/

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
http GET :3000/recipes/614f93e9731b88de6cfb03e7

// BAD REQUEST
http GET :3000/recipes/614f93e9731b88de6cfb03e8
http GET :3000/recipes/614f93e9731b88de6cfb03e
*/

module.exports = router;
