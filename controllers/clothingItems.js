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
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      const itemOwner = item.owner.toString();

      if (req.user._id !== itemOwner) {
        res.status(403).send({ message: "Forbidden" });
      } else {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then((itemRes) => {
            res.send({ data: itemRes });
          })
          .catch((e) => {
            console.error(e);
            handleErrors(req, res, e);
          });
      }
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
module.exports = { createItem, getItems, deleteItem };
