("use strict");
import Joi from "joi";

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionTypes = ["starter", "pro", "business"];

export const userAuthSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
  subscription: Joi.string().valid(...subscriptionTypes),
}).meta({ className: "IUserAuth" });

export const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  }),
}).meta({ className: "IEmail" });

export const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
}).meta({ className: "ISubscription" });

// module.exports = {
//   userAuthSchema,
//   subscriptionSchema,
//   emailSchema,
// };

// module.exports = {
//   schemas,
// };
