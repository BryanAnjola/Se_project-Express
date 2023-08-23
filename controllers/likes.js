const ClothingItem = require("../models/clothingItem");
const {
  NotFoundError,
  ValidationError,
  ServerError,
} = require("../utils/errors");

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = NotFoundError;
      throw Error;
    })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "NotFoundError") {
        return res.status(NotFoundError).send({ message: NotFoundError });
      }
      if (err.statusCode === NotFoundError) {
        return res.status(NotFoundError).send({ message: NotFoundError });
      }
      return res.status(ServerError).send({ message: ServerError });
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new NotFoundError("Not Found");
      error.statusCode = NotFoundError;
      throw Error;
    })
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ValidationError).send({ message: "Invalid Id" });
      }
      if (err.statusCode === NotFoundError) {
        return res.status(NotFoundError).send({ message: NotFoundError });
      }
      return res.status(ServerError).send({ message: ServerError });
    });
};
