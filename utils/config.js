const user = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "super-strong-secret-token";

const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
  expiresIn: "7d",
});

module.exports = { token, JWT_SECRET };
