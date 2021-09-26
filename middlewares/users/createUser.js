const usersServices = require('../../services/usersServices');

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await usersServices.create(name, email, password);
    return res.status(201).json(data);
};

module.exports = { createUser };