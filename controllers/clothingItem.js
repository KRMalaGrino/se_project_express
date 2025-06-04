const ClothingItem = require("../models/clothingItem");

// read items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "Get Items Failed", e });
    });
};

// create item
const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL }).then((item) => {
    console.log(item);
    res.send({ data: item }).catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
  });
};

// update item
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((e) => {
      res.status(500).send({ message: "Error from updateItem", e });
    });
};

// delete item
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({}))
    .catch((e) => {
      res.status(500).send({ message: "Error from deleteItem", e });
    });
};

// like item
likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  ).catch((e) => {
    res.status(500).send({ message: "Error from likeItem", e });
  });
//...

// unlike item
dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  ).catch((e) => {
    res.status(500).send({ message: "Error from dislikeItem", e });
  });
//...

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
