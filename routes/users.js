const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/users");
const { handleAuthError } = require("../middlewares/auth");

router.get("/me", handleAuthError, getCurrentUser);
router.patch("/me", handleAuthError, updateUser);

module.exports = router;
