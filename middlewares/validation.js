const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const clothingItemValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().uri().required(),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

module.exports = clothingItemValidation;
