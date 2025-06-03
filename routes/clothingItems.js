const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItem");

router.get("/", getItems); // readItem
router.post("/", createItem); // createItem
router.put("/:itemId", updateItem); // updateItem
router.delete("/:itemId", deleteItem); // deleteItem

module.exports = router;
