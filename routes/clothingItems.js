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
router.delete("/:itemId", deleteItem); // deleteItem
router.put("/:itemId/likes", likeItem); // likeItem
router.delete("/:itemId/likes", dislikeItem); // unlike and item

module.exports = router;
