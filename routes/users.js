const router = require("express").Router();
const { getUserById } = require("../controllers/user");

router.get("/:userId", getUserById);

module.exports = router;
