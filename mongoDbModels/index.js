const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // await mongoose.connect(`mongodb://${CONFIG.mongo_db_host}:${CONFIG.mongo_db_port}/${CONFIG.mongo_db_name}`);
    await mongoose.connect(`mongodb://joe_24:Jestus%4024@ac-vdwqmba-shard-00-00.xal5osf.mongodb.net:27017,ac-vdwqmba-shard-00-01.xal5osf.mongodb.net:27017,ac-vdwqmba-shard-00-02.xal5osf.mongodb.net:27017/your_db_name?replicaSet=atlas-1136zn-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority`);
    console.log('Connected to MongoDb database: ', CONFIG.mongo_db_name);
  } catch (err) {
    console.error('Error in connecting mongo db',err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
