const User = require("../models/user");
const { handleErrors } = require("../utils/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

// Get users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};
const getUser = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
    });
};

const createUser = (req, res) => {
  const { email, password, name, avatar } = req.body;

  User.findOne({ email }).then((emailFound) => {
    if (emailFound) {
      res.status(409).send({ message: "User already exists" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((user) => {
          res.send({ name, avatar, email, _id: user._id });
        })
        .catch((err) => {
          console.error(err, "console error for createUser");
          handleErrors(req, res, err);
        });
    }
  });
};

const login = (req, res) => {
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

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.error(err);
      handleErrors(req, res, err);
    });
};
const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(res.status(404).send({ message: "User not found" }));
      }
      return next(res.send(user));
    })
    .catch((err) => {
      handleErrors(req, res, err);
    });
};

module.exports = {
  getUser,
  createUser,
  getUsers,
  getCurrentUser,
  updateUser,
  login,
};
