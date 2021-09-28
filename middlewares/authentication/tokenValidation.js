const jwt = require('jsonwebtoken');
const recipesServices = require('../../services/usersServices');

const secret = require('./mySecretJWT'); // Chave secreta usada para encriptografar os dados.

const tokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ error: 'Token não encontrado' }); }
  try {
    const decoded = jwt.verify(token, secret); // O método verify, verifica a validação e decodificar o token JWT. Caso o token esteja expirado, a própria biblioteca irá retornar um erro.
    const user = await recipesServices.getByProperty('name', decoded.name); // Se o token é válido, buscar o usuário no bando de dados.
    if (!user) { return res.status(401).json({ message: 'Erro ao procurar usuário do token.' }); }
    req.user = user; // Disponibilizando o user para outros middlewares
    console.log(user);
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = { tokenValidation };

// Para descripitografar o token
// echo 'tokenJWT' | base64 --decode

    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          _id: '5e54590ba49448f7e5fa73c0',
          username: 'italssodj',
          password: 'senha123'
        },
        iat: 1582587327,
        exp: 1584774714908
      }
    */