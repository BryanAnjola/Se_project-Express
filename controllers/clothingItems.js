const ClothingItem = require("../models/clothingItem");
const { ForbiddenError } = require("../Errors/ForbiddenError");
const { BadRequestError } = require("../Errors/BadRequestError");
const { NotFoundError } = require("../Errors/NotFoundError");

const createItem = (req, res, next) => {
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
      if (e.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(e);
      }
    });
};
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.send({ data: items });
    })
    .catch((e) => next(e));
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("an item with specified id not found"))
    .then((item) => {
      const itemOwner = item.owner.toString();

      if (req.user._id !== itemOwner) {
        throw new ForbiddenError("cannot delete another user's post");
      } else {
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then((itemRes) => {
            res.send({ data: itemRes });
          });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
    });
};
module.exports = { createItem, getItems, deleteItem };
