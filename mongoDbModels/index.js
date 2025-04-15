const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // await mongoose.connect(`mongodb://${CONFIG.mongo_db_host}:${CONFIG.mongo_db_port}/${CONFIG.mongo_db_name}`);
    await mongoose.connect(`mongodb+srv://atlas-sample-dataset-load-67fe1f157de07b4cf65b452e:<db_password>@cluster0.xal5osf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to MongoDb database: ', CONFIG.mongo_db_name);
  } catch (err) {
    console.error('Error in connecting mongo db',err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
