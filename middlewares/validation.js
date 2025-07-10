const { Joi, celebrate, Segments } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const clothingItemValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
      "string.empty": "The 'name' field must be filled in",
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The 'imageUrl' field must be filled in",
      "string.uri": "The 'imageUrl' field must be a valid URL",
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "any.only": "The 'weather' field must be one of 'hot', 'warm', or 'cold'",
      "string.empty": "The 'weather' field must be filled in",
    }),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
      "string.empty": "The 'name' field must be filled in",
    }),
    avatar: Joi.string().uri().required().messages({
      "string.uri": "The 'avatar' field must be a valid URL",
      "string.empty": "The 'avatar' field must be filled in",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "The 'email' field must be filled in",
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": "The minimum password length is 8 characters",
      "string.empty": "The 'password' field must be filled in",
    }),
  }),
});

const IdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

const loginAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be at most 30 characters long",
      "string.empty": "The 'name' field must be filled in",
    }),
    avatar: Joi.string().uri().required().messages({
      "string.uri": "The 'avatar' field must be a valid URL",
      "string.empty": "The 'avatar' field must be filled in",
    }),
  }),
});

module.exports = {
  clothingItemValidation,
  createUserValidation,
  IdValidation,
  loginAuthentication,
  updateUserValidation,
};
