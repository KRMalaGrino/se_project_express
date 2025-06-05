const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// read items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Get Items Failed", err });
    });
};

// create item
const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageURL, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err.name);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item data" });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from createItem", e });
    });
};

// delete item
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(204).send({}))
    .catch((err) => {
      console.error(err.name);
      if (err.message === "NotFound") {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from deleteItem", err });
    });
};

// like item
const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      res.status(500).send({ message: "Error from likeItem", err });
    });

// dislike item
const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err.name);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID" });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from likeItem", err });
    });

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
