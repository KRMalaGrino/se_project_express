const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItems);

// 404 for unknown subroutes
router.use((res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});
module.exports = router;
