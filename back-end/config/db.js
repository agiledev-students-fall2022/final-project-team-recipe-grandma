const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to database...');
    const admin = process.env.API_USN;
    const adminPassword = process.env.API_PASS;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const databaseURL = process.env.APP_DB_URL
      .replace('<password>', adminPassword)
      .replace('<admin>', admin)
      .replace('<username>', admin);
    console.log(`Connecting to: ${databaseURL}`);
    const conn = await mongoose.connect(databaseURL, options);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return mongoose;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
