require('dotenv').config();
const mongoose = require('mongoose');

async function DatabaseConnection() {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to database');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error: ', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected');
    });

    await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('Database connection established successfully');
  } catch (err) {
    console.error('Database connection error: ', err);
  }
}

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

module.exports = DatabaseConnection;
