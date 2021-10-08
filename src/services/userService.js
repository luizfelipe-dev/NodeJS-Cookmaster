const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { 
    isUserDataValid, 
    isUserEmailValid,
} = require('../validations/usarDataValidations');
require('dotenv').config();

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const secret = process.env.SECRET;

const createUserService = async (name, email, password) => {
    const checkUserData = isUserDataValid(name, password);
    const checkUserEmail = isUserEmailValid(email);

    if (!checkUserData || !checkUserEmail) {
            return {
                status: 400,
                message: { message: 'Invalid entries. Try again.' },
            };
    }

    const findUser = await userModel.findUserModel(email);

    if (findUser !== null) {
        return {
            status: 409,
            message: { message: 'Email already registered' },
        };
    }
    
    const user = await userModel.createUserModel(name, email, password);
    return { status: 201, message: user };    
};

const loginService = async (email, password) => {
    if (!email || !password) {
        return { status: 401, message: { message: 'All fields must be filled' } };
    } 

    const user = await userModel.loginModel(email, password);

    if (user === null) {
        return { status: 401, message: { message: 'Incorrect username or password' } };
    }

    const { _id } = user;

    const tokenPayload = {
        userId: _id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(tokenPayload, secret, jwtConfig);

    return { status: 200, message: { token } };
};

const getAllUsersService = async () => {
    const users = await userModel.getAllUsersModel();
    return { status: 200, message: users };
};

const findUserByIdService = async (id) => {
    if (!ObjectId.isValid(id)) return { status: 500, message: 'invalid id' };

    const user = await userModel.findUserById(id);
    return { status: 200, message: user };
};

const deleteUserService = async (id, role, userId) => {
    if (role !== 'admin' && id !== userId) {
        return { 
            status: 500,
            message: 'permission denied',
        };
    }
    
    const foundedUser = await findUserByIdService(id);

    console.log(foundedUser);

    const user = await userModel.deleteUserModel();
    return { 
        status: 200, 
        message: `${user} deleted.`,
    };
};

module.exports = { 
    createUserService,
    loginService,
    getAllUsersService,
    deleteUserService,
};