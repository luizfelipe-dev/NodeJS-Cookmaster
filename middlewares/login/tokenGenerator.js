const jwt = require('jsonwebtoken');

const secret = 'meuTokenSecreto'; // Chave secreta usada para encriptografar os dados.

// Middleware que o login do usuário pelo email e password
const tokenGenerator = async (req, res, _next) => {
  const { email } = req.body;
  const jwtConfig = {
    expiresIn: '1m', // tempo pelo qual esse token será válido (1d = 1 dia, 1h = 1 hora, 1m = 1 minuto );
    algorithm: 'HS256', // Algoritmo utilizado para assinar o token
  };
  try {
    const token = jwt.sign({ data: email }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

module.exports = { tokenGenerator };
