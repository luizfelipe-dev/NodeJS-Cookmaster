const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/Cookmaster';

let db = null;

function connection() { 
    return db
    ? Promise.resolve(db)
    : MongoClient.connect(MONGO_URL, OPTIONS)
    .then((conn) => {
    db = conn.db('Cookmaster');
    return db;
    });
}

module.exports = connection; 