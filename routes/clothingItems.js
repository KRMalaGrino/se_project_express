const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

// unprotected route -
router.get("/", getItems); // readItem

router.use(auth); // protected routes below
router.post("/", createItem); // createItem
router.delete("/:itemId", deleteItem); // deleteItem
router.put("/:itemId/likes", likeItem); // likeItem
router.delete("/:itemId/likes", dislikeItem); // unlike and item

module.exports = router;
