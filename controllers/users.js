const User = require("../models/user");
const { handleErrors } = require("../utils/errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Get users
const getUsers = (req, res) => {
  console.log(req);
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ name, avatar, email, password: hash });
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};

module.exports = {
  getUser,
  createUser,
  getUsers,
};
