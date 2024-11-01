const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Use new MongoDB parser
      useUnifiedTopology: true, // Fixes connection behavior
    });
    console.log(`MongoDB connected: ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDb;
