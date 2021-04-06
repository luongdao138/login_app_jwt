const Joi = require('joi');

const registerSschema = Joi.object({
  username: Joi.string().min(6).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().min(6).max(50),
  date_of_birth: Joi.optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string().min(6).max(50),
});

const registerValidation = (data) => {
  return registerSschema.validate(data);
};

const loginValidation = (data) => {
  return loginSchema.validate(data);
};

module.exports = { registerValidation, loginValidation };
