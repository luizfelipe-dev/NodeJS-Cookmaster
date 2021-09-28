const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const connection = require('./connection');

const app = express();
app.use(bodyParser.json());

const TABLE_NAME = 'recipes'; // Tabela do mongodb

// Retorna todas as receitas
const getAll = async () => {
  const db = await connection();
  const recipes = await db.collection(TABLE_NAME).find({}).toArray();
  return recipes;
};

// Retorna a receita pelo id;
const getById = async (id) => {
  const db = await connection();
  return db.collection(TABLE_NAME).findOne(ObjectId(id));
};

// Retorna uma receita pelo valor de uma propriedade
const getByProperty = async (property, value) => {
  const db = await connection();
  const user = await db.collection(TABLE_NAME).findOne({ [property]: value });
  return user;
};

// Adiciona uma nova receita e retorna a receita criada
const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const { insertedId } = await db.collection(TABLE_NAME)
    .insertOne({ name, ingredients, preparation, userId });
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

// Edita uma receita pelo id e retorna a receita editada
const update = async (id, itensSold) => {
  const db = await connection();
  await db.collection(TABLE_NAME)
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    );
  return { _id: id, itensSold };
};

// Remove uma receita pelo id e retorna a receita deletada
const remove = async (id) => {
  const db = await connection();
  const removedRecipe = db.collection(TABLE_NAME).findOne(ObjectId(id));
  await db.collection(TABLE_NAME).deleteOne({ _id: ObjectId(id) });
  return removedRecipe;
};

module.exports = { getAll, getById, getByProperty, create, update, remove };
