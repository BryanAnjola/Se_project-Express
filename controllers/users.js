const User = require("../models/user");
const { handleErrors } = require("../utils/errors");

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
  const { avatar } = req.body;

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((e) => {
      console.error(e);
      handleErrors(req, res, e);
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
      console.error(e);
      handleErrors(req, res, e);
    });
};
module.exports = {
  getUser,
  createUser,
  getUsers,
};
