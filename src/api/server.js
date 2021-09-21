const bodyParser = require('body-parser');

const app = require('./app');
const User = require('../controllers/users');

app.use(bodyParser.json());
app.post('/users', User.create);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
