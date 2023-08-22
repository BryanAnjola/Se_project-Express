const router = require("express").Router();
const clothingItem = require("./ClothingItem");
const user = require("./users");
const like = require("./likes");

router.use("/items", clothingItem);
router.use("/userrs", user);
router.use("/items", like);

router.use((req, res) => {
  res.status(500).send({ message: "router not found" });
});

module.exports = router;
