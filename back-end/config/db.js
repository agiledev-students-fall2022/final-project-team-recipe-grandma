const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to database...');
    const admin = process.env.API_USN;
    const adminPassword = process.env.API_PASS;
    const conn = await mongoose.connect(process.env.APP_DB_URL
      .replace('<password>', adminPassword)
      .replace('<admin>', admin)
      .replace('<username>', admin));
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
