const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");

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

app.use((req, res, next) => {
  req.user = {
    _id: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODRjM2JjY2E3MTBlYjg3NzdmZmY5M2EiLCJpYXQiOjE3NDk5NTc3MTUsImV4cCI6MTc1MDU2MjUxNX0.1d4nRw0G6DP7USmtWthmAST-QENsqW8d6q9SCWKvXBE",
  };
  return next();
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
