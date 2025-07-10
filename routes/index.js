const router = require("express").Router();

const { NotFoundError } = require("../utils/errors/notFoundError");
const clothingItems = require("./clothingItems");
const userRouter = require("./users");
const { login, createUser } = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/signin", login); // unprotected
router.post("/signup", createUser); // unprotected
router.use("/items", clothingItems); // protected internally in clothingItems.js

router.use("/users", auth, userRouter); // protected route with auth

// 404 for unknown subroutes
router.use((req, res, next) => next(new NotFoundError("Router not found")));

module.exports = router;
