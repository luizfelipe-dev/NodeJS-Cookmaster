const connection = require('./connection');

const findUserModel = async (email) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email });
    return user;
};

const findUserById = async (id) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ _id: id });
    console.log(user);
    return user;
};

const createUserModel = async (name, email, password) => {
    const db = await connection();

    const user = await db.collection('users')
        .insertOne({ name, email, password, role: 'user' });

    delete user.ops[0].password;

    return { user: user.ops[0] };
};

const loginModel = async (email, password) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email, password });
    return user;
};

const getAllUsersModel = async () => {
    const db = await connection();
    const users = await db.collection('users').find({}).toArray();
    
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
    return usersWithoutPassword;
};

const deleteUserModel = async (id) => {
    const db = await connection();
    const { name } = await findUserById(id);
    
    await db.collection('users').remove({ _id: id });
    return name;
};

module.exports = {
    createUserModel,
    findUserModel,  
    findUserById,
    loginModel,  
    getAllUsersModel,
    deleteUserModel,
};