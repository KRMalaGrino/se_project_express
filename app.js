require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const router = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use("/", router);
app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler
app.use(errorHandler); // centralized error handler

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
