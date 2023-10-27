const router = require("express").Router();
const clothingItem = require("./clothingItem");
const users = require("./users");
const { createUser, login } = require("../controllers/users");
const {
  validateUserInfoBody,
  validateLogin,
} = require("../middlewares/Validation");
const NotFoundError = require("../Errors/NotFoundError");

router.use("/items", clothingItem);
router.use("/users", users);
router.post("/signin", validateLogin, login);
router.post("/signup", validateUserInfoBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Router not found"));
});

module.exports = router;
