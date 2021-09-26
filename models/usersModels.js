const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const connection = require('./connection');

const app = express();
app.use(bodyParser.json());

const TABLE_NAME = 'users'; // Tabela do mongodb

// Retorna todos os produtos da coleção
const getAll = async () => {
  const db = await connection();
  const users = await db.collection(TABLE_NAME).find({}).toArray();
  return users;
};

// Retorna o usuário por id
const getById = async (id) => {
  const db = await connection();
  return db.collection(TABLE_NAME).findOne(ObjectId(id));
};

// Retorna o usuário pelo email
const getByProperty = async (property, value) => {
  const db = await connection();
  const user = await db.collection(TABLE_NAME).findOne({ [property]: value });
  return user;
};

// Adiciona um novo usuário e retorna o usuário criado.
const create = async (name, email, password) => {
  const db = await connection();
  const { insertedId } = await db.collection(TABLE_NAME)
    .insertOne({ name, email, password });
  return {
    name,
    email,
    password,
    role: 'user',
    _id: insertedId, 
  };
};

module.exports = { getAll, getById, getByProperty, create };
