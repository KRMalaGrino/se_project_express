const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/user");
const validation = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validation.updateUserValidation, updateProfile);

module.exports = router;
