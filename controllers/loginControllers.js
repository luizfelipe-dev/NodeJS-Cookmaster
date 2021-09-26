const { Router } = require('express');

const { loginValidation } = require('../middlewares/login/loginValidation');
const { emptyFildValidation } = require('../middlewares/login/emptyFildValidation');
const { tokenGenerator } = require('../middlewares/login/tokenGenerator');

const router = Router();

router.post('/',
emptyFildValidation,
loginValidation,
tokenGenerator,
async () => {});
/* REQUISIÇÃO:
// GOOD REQUEST
http POST :3000/login/ email='erickjacquin@gmail.com' password='12345678'
http POST :3000/login/ name:'Erick Jacquin' email='erickjacquin@gmail.com' password='12345678'

// BAD REQUEST
http POST :3000/login/ email='' password='12345678'
http POST :3000/login/ email='erickjacquin@gmail.com' password=''
http POST :3000/login/ email='erickjacquingmail.com' password='12345678'
http POST :3000/login/ email='erickjacquin@gmail.com' password='123'
*/

module.exports = router;
