const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const authRoutes = require("./routes/auth");
const budgetRoutes = require("./routes/budget");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use(budgetRoutes);

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});
//7CenycxUocHa6eEJ
mongoose
  .connect(
    `mongodb+srv://glenntedd:${process.env.MYPASSWORD}@cluster0.hvxfqut.mongodb.net/budget`
  )
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {
    const error = new Error("Database connection error");
    error.stack = 500;
    throw error;
  });
