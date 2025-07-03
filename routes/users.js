const router = require("express").Router();

const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/user");
const createUserValidation = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);
router.post("/", createUserValidation, createUser);

module.exports = router;
