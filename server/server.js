const express = require("express");
let DatabaseConnection = require("./config/Database");
require("dotenv").config();
const app = express();
let cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth/v1", authRoute);
const PORT = process.env.PORT;

DatabaseConnection();

app.get("/", (req, res) => {
  res.send('<h1>Home</h1><a href="/auth/google">Login with Google</a>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
