const Joi = require('joi');

const restaurantSchema = Joi.object({
    city: Joi.string()
        .pattern(/^(-?\d{1,3}(\.\d{1,6})?,-?\d{1,3}(\.\d{1,6})?|[\w\s.,-]{1,100})$/)
        .required(),

    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

})

module.exports = restaurantSchema;