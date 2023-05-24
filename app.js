const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const authRoutes = require("./routes/auth");
//const budgetRoutes = require("./routes/budget");
//const bundleRoutes = require("./routes/bundle");
const itemRoutes = require("./routes/item");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);

// app.use("/budget", budgetRoutes);
// app.use("/bundle", bundleRoutes);
app.use("/items", itemRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    err.message = "Database connection error";
    err.status = 500;
    throw err;
  });
