const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");

module.exports.handleAuthError = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(ERROR_401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(ERROR_401).send({ message: "Invalid Token" });
  }

  // try {
  //   payload = jwt.verify(token, 'some-secret-key');
  // } catch (e) {
  //   const err = new Error('Authorization required');
  //   err.statusCode = 401;

  //   next(err);
  // }
  req.user = payload;
  return next();
};
