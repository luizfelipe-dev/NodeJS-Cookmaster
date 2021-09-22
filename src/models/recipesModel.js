const { ObjectID } = require('mongodb');
const connection = require('../../seed');

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getById = async (id) => {
  const db = await connection();
  if (!ObjectID.isValid(id)) return false;
  const result = await db.collection('recipes').findOne({ _id: ObjectID(id) });
  return result;
};

const create = async (recipe) => {
  const db = await connection();
  const { ops } = await db.collection('recipes').insertOne(recipe);
  return ops[0];  
};

module.exports = {
  getAll,
  getById,
  create,
};