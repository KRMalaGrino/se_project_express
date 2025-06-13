const jwt = require("jsonwebtoken");

const JWT_SECRET = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED).send({ message: "Authorization error" });
};

const extractBearerToken = (header) => header.replace("Bearer ", "");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const tokenValue = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(tokenValue, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // adding the payload to the request object
  return next(); // passing the request further along
};

module.exports = auth;
