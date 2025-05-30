const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // await mongoose.connect(`mongodb://${CONFIG.mongo_db_host}:${CONFIG.mongo_db_port}/${CONFIG.mongo_db_name}`);
    await mongoose.connect(`mongodb+srv://jestusjoestince:11KbJMSKzV0TZtDF@cluster0.lug6lfa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to MongoDb database: ', CONFIG.mongo_db_name);
  } catch (err) {
    console.error('Error in connecting mongo db',err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
