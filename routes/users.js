const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUserById,
  login,
} = require("../controllers/user");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.post("/login", login);

module.exports = router;
