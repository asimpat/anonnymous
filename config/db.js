const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const database =
  process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/anonymous';

const db = async () => {
  try {
    const con = await mongoose.connect(database);
    console.log(`mongodb connected: ${con.connection.host}`);
    console.log(`DB Connection successful!`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
