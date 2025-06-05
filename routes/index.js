const router = require("express").Router();
const clothingItems = require("./clothingItems");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/clothing-items", clothingItems);

// 404 for unknown subroutes
router.use((req, res) => {
  res.status(404).send({ message: "Router not found" });
});
module.exports = router;
