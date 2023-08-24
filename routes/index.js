const router = require("express").Router();
const clothingItem = require("./ClothingItem");
const user = require("./users");
const like = require("./likes");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);
router.use("/items", like);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "router not found" });
});

module.exports = router;
