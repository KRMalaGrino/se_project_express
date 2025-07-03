const router = require("express").Router();

const {
  getCurrentUser,
  updateProfile,
  createUser,
} = require("../controllers/user");
const validation = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);
router.post("/", validation.createUserValidation, createUser);

module.exports = router;
