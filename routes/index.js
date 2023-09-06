const router = require("express").Router();
const clothingItem = require("./clothingItem");
const user = require("./users");
const like = require("./likes");
const { createUser, login } = require("../controllers/users");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);
router.use("/items", like);
router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "router not found" });
});

module.exports = router;
