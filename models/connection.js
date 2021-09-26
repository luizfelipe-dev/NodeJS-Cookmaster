const mongoClient = require('mongodb').MongoClient;

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = async () => {
  const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster'; // Conexão para o avaliador
  // const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster'; // Conexão normal
  const DB_NAME = 'Cookmaster';
  try {
    const connectionMongodb = await mongoClient.connect(MONGO_DB_URL, OPTIONS);
    global.db = await connectionMongodb.db(DB_NAME);
    console.log(`Connection to mongodb - database ${DB_NAME}`);
    return global.db;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = connection;
