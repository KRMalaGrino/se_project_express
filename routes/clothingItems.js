const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const { auth } = require("../middlewares/auth");

// unprotected route -
router.get("/", getItems); // readItem

// protected routes -
router.post("/", auth, createItem); // createItem
router.delete("/:itemId", auth, deleteItem); // deleteItem
router.put("/:itemId/likes", auth, likeItem); // likeItem
router.delete("/:itemId/likes", auth, dislikeItem); // unlike and item

module.exports = router;
