const { ObjectId } = require('bson');
const mongoConnection = require('./connection');

const getAll = async () => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes'));

  const response = await productCollection.find().toArray();

  return response;
};

const create = async ({ name, ingredients, preparation, userId }) => {
  const productCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));

  const { insertedId: id } = await productCollection
    .insertOne({ name, ingredients, preparation, userId: new ObjectId(userId) });

  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: id,
  };
};

const getById = async (id) => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes'));

  const response = await productCollection.findOne({ _id: new ObjectId(id) });

  return response;
};

const update = async (id, { name, ingredients, preparation }) => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes'));

  const response = await productCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );

  return response.result.ok;
};

const deleteById = async (id) => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes'));

  const response = await productCollection.deleteOne({ _id: new ObjectId(id) });

  return response;
};

const addPath = async (id, image) => {
  const productCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('recipes'));

  const response = await productCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { image } },
  );

  return response.result.ok;
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
  addPath,
};