const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../Errors/UnauthorizedError");
const { ConflictError } = require("../Errors/ConflictError");
const { BadRequestError } = require("../Errors/BadRequestError");
const { NotFoundError } = require("../Errors/NotFoundError");
const User = require("../models/user");

// Get users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((e) => {
      next(e);
    });
};
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError("A user with specified id not found"))
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      next(e);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name, avatar } = req.body;

  User.findOne({ email })
    .then((emailFound) => {
      if (emailFound) {
        next(new ConflictError("User already exists"));
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => User.create({ name, avatar, email, password: hash }))
          .then((user) => {
            res.send({ name, avatar, email, _id: user._id });
          })
          .catch((e) => {
            if (e.name === "ValidationError") {
              next(new BadRequestError("Invalid data"));
            } else {
              next(e);
            }
          });
      }
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(e);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError("incorrect email or password")));
};
const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(() => {
      throw new NotFoundError("a user with the specified id not found");
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("invalid data"));
      } else {
        next(err);
      }
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
