// const Joi = require("joi");
import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
}).meta({ className: "IAddContact" });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
}).meta({ className: "IUpdateFavorite" });

module.exports = {
  addSchema,
  updateFavoriteSchema,
};

// module.exports = {
//   schemas,
// };
