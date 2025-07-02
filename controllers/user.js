const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = require("../utils/config");

const User = require("../models/user");
const {
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  CONFLICT,
} = require("../utils/errors");

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = NOT_FOUND;
        err.message = "Item not found";
      }
      if (err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid user ID";
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        err.statusCode = UNAUTHORIZED;
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObj = user.toObject(); // turns the mongoose schema into a normal javascript object
      delete userObj.password; // deletes the user password

      res.status(201).send({
        _id: userObj._id,
        name: userObj.name,
        avatar: userObj.avatar,
        email: userObj.email,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        err.statusCode = CONFLICT;
        err.message = "Email already exists";
      }
      if (err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid user data";
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = NOT_FOUND;
        err.message = "Item not found";
      }
      if (err.name === "CastError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid user ID";
      }
      if (err.name === "ValidationError") {
        err.statusCode = BAD_REQUEST;
        err.message = "Invalid user data";
      }
      next(err);
    });
};

module.exports = { createUser, login, getCurrentUser, updateProfile };
