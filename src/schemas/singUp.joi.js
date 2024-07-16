const Joi = require('joi');

const signUpSchema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    mail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required()
})

module.exports = signUpSchema;
