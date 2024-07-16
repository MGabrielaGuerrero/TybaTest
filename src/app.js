const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require("dotenv").config({ path: "./.env" });
require("./utils/DataBase")

//Import routes
const loginRoutes = require("./routes/login.route");
const restaurantRoutes = require ("./routes/restaurant.route")
const transactionRoutes = require("./routes/transaction.route")

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/", loginRoutes);

app.use('/restaurants', restaurantRoutes);
app.use('/transaction', transactionRoutes);

app.listen(PORT, () => {
  console.log("🚀 ~ app.listen ~ PORT:", PORT)
});


module.exports = app;
