const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/users");
const { handleAuthError } = require("../middlewares/auth");
const { validateAvatar } = require("../middlewares/Validation");

router.get("/me", handleAuthError, getCurrentUser);
router.patch("/me", handleAuthError, validateAvatar, updateUser);

module.exports = router;
