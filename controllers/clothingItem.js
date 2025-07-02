const ClothingItem = require("../models/clothingItem");
const { BAD_REQUEST, FORBIDDEN, NOT_FOUND } = require("../utils/errors");

// read items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

// create item
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid item data";
      }
      next(err);
    });
};

// delete item
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(FORBIDDEN)
          .send({ message: "Only the owner can delete this item" });
      }

      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
        res.status(200).send({ data: deletedItem });
      });
    })
    .catch((err) => {
      if (err.message === "Item not found") {
        err.statusCode = NOT_FOUND;
      }
      if (err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid item ID";
      }
      next(err);
    });
};

// like item
const likeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        const error = new Error("Item not found");
        error.statusCode = NOT_FOUND;
        throw error;
      }
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid item ID";
      }
      next(err);
    });

// dislike item
const dislikeItem = (req, res, next) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) =>
      item
        ? res.status(200).send(item)
        : res.status(NOT_FOUND).send({ message: "Item not found" })
    )
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid item ID";
      }
      next(err);
    });

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
