const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

const { likeItem, dislikeItem } = require("../controllers/likes");
const { handleAuthError } = require("../middlewares/auth");

router.post("/", handleAuthError, createItem);

router.get("/", getItems);

router.delete("/:itemId", handleAuthError, deleteItem);
router.put("/:itemId/likes", handleAuthError, likeItem);
router.delete("/:itemId/likes", handleAuthError, dislikeItem);

module.exports = router;
