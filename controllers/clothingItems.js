const ClothingItem = require("../models/clothingItem");
const { handleErrors } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};

const deleteItem = (req, res) => {
  console.log(req.params.itemId);
  if (req.params.itemId !== req.user._id) {
    res.status(403).send({ message: "Forbidden" });
  } else {
    ClothingItem.findByIdAndDelete(req.params.itemId)
      .orFail()
      .then((item) => res.send({ data: item }))
      .catch((e) => {
        console.error(e);
        handleErrors(req, res, e);
      });
  }
};
module.exports = { createItem, getItems, deleteItem };
