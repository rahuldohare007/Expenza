const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 8000;
const DatabaseConnection = require('./config/Database');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());
DatabaseConnection();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
