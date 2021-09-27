const mongoConnect = require('./connection');
const userModel = require('./userModel');

const create = async ({ name, ingredients, preparation }, email) => {
    const usersCollection = await mongoConnect.getConnection()
      .then((db) => db.collection('recipes'));
    const idUser = await userModel.getEmail(email);
    const { _id: id } = idUser;
    const createUser = await usersCollection.insertOne({ name, ingredients, preparation });
    return {
      name,
      ingredients,
      preparation,
      _id: createUser.insertedId,
      id,
    };
  };

module.exports = { create };