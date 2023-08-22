const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItems,
  deleteItem,
} = require("../controllers/clothingItems.js");
//crud

//create
router.post("/", createItem);

//Read
router.get("/", getItems);

//update
router.put("/:itemId", updateItems);
//Delete
router.delete("/:itemId", deleteItem);

module.exports = router;
