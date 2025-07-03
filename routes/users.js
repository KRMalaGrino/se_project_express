const router = require("express").Router();

const {
  getCurrentUser,
  login,
  updateProfile,
  createUser,
} = require("../controllers/user");
const validation = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);
router.post("/", validation.createUserValidation, createUser);
router.post("/signin", validation.loginAuthentication, login);

module.exports = router;
