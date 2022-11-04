const mongoose = require('mongoose');

APP_DB_URL = 'mongodb+srv://my-db-01:<lifeiyifan0405>@cluster0.8alf0tc.mongodb.net/test';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(APP_DB_URL);
    console.log(`MongoDB Connect: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
