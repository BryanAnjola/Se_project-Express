const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothingItems");

const { likeItem, dislikeItem } = require("../controllers/likes");
const { handleAuthError } = require("../middlewares/auth");

const { validateCardBody, validateId } = require("../middlewares/Validation");

router.post("/", handleAuthError, createItem);

router.get("/", getItems);

router.delete("/:itemId", handleAuthError, validateId, deleteItem);
router.put("/:itemId/likes", handleAuthError, likeItem, validateId);
router.delete("/:itemId/likes", handleAuthError, dislikeItem, validateId);

module.exports = router;
