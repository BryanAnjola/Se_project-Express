const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("..//Errors/UnauthorizedError");

module.exports.handleAuthError = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization required");
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("Invalid Token");
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
