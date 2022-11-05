const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(proccess.env.APP_DB_URL);
    console.log(`MongoDB Connect: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
