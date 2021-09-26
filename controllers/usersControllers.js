const { Router } = require('express');
const { createUser } = require('../middlewares/users/createUser');
const { getAllUsers } = require('../middlewares/users/getAllUsers');

const { nameValidation } = require('../middlewares/users/nameValidation');
const { passwordValidation } = require('../middlewares/users/passwordValidation');
const { emailValidation } = require('../middlewares/users/emailValidation');
const { emailUniqueValidation } = require('../middlewares/users/emailUniqueValidation');

const router = Router();

router.post('/',
nameValidation,
passwordValidation,
emailValidation,
emailUniqueValidation,
createUser, async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
http POST :3000/users/ name='Lucas' email='emailvalido1@gmail.com' password='Senha123'

// BAD REQUEST
http POST :3000/users/ name='' email='emailvalido@gmail.com' password='Senha123'
http POST :3000/users/ name='Lucas' email='' password='Senha123'
http POST :3000/users/ name='Lucas' email='emailvalido@gmail.com' password=''
http POST :3000/users/ name='Lucas' email='erickjacquin@gmail.com' password=''
*/

router.get('/', getAllUsers, async () => {});
/* REQUISIÇÃO:
http GET :3000/users
*/

module.exports = router;
