const User = require("../models/user");
const { ValidationError, NotFoundError } = require("../utils/errors");

// Get users
const getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      console.log(e);
      if (e.name && e.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.message);
      }
    });
};
const getUser = (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      console.log(e.name);
      if (
        (e.name && e.name === "NotFoundError") ||
        e.name === "DocumentNotFoundError"
      ) {
        console.log("throwing a NotFoundError");
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: notFoundError.message });
      } else {
        console.log("throwing a validationError", e);
        const validationError = new ValidationError();
        console.log(validationError.message);
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
    });
};
const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name && e.name === "ValidationError") {
        console.log(ValidationError);
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
    });
};
module.exports = {
  getUser,
  createUser,
  getUsers,
};
