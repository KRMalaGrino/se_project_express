const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6837f9a4e8a13c4fdca86e7d",
  };
  next();
});
app.use("/users", userRouter);
app.use("/clothing-items", clothingItemsRouter);

// handles unknown routes
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
