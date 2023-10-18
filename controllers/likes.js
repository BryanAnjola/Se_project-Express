const ClothingItem = require("../models/clothingItem");
const { BadRequestError } = require("../Errors/BadRequestError");
const { NotFoundError } = require("../Errors/NotFoundError");

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("an item with the specified id not found");
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "CastError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(e);
      }
    });
};
module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("an item with the specified id not found");
    })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      if (e.name === "CastError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(e);
      }
    });
};
