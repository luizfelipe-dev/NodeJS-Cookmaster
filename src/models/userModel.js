const mongoConnect = require('./connection');

const create = async ({ name, email, password, role }) => {
    const userCollection = await mongoConnect.getConnection()
      .then((db) => db.collection('users'));
    const createUser = await userCollection.insertOne({ name, email, password, role });

    return {
      name,
      email,
      password,
      role,
      id: createUser.insertedId,
    };
  };

const getEmail = async (email) => {
  const userCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('users').findOne({ email }));

  return userCollection;  
};

const getId = async (id) => {
  const userCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('recipes').findOne({ id }));

  return userCollection;  
};
  
const getUser = async ({ email, password }) => {
  const userCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('users').findOne({ email, password }));

  return userCollection;  
};

module.exports = { create, getEmail, getId, getUser };
