const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/validation");

// unprotected route -
router.get("/", getItems); // readItem

router.use(auth); // protected routes below
router.post("/", validation.clothingItemValidation, createItem); // createItem with validation
router.delete("/:itemId", validation.IdValidation, deleteItem); // deleteItem
router.put("/:itemId/likes", validation.IdValidation, likeItem); // likeItem
router.delete("/:itemId/likes", validation.IdValidation, dislikeItem); // unlike and item

module.exports = router;
