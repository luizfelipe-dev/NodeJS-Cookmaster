const RegisterUserService = require('../../services/users/RegisterUserService');

class RegisterUserController {
  static async handle(req, res, next) {
    const { name, email, password } = req.body;

    const registerUserService = new RegisterUserService({
      name,
      email,
      password,
    });

    const registeredUser = await registerUserService.handle();

    if (registeredUser.isError) return next(registeredUser);

    res.status(201).json(registeredUser);
  }
}

module.exports = RegisterUserController;