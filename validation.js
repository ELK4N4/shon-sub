const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(16).required(),
        email: Joi.string().min(6).max(30).required().email(),
        password: Joi.string().min(6).max(255).required()
    });

    return registerSchema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
    const loginSchema = Joi.object({
        email: Joi.string().min(6).max(30).email().required(),
        password: Joi.string().min(6).max(255).required(),
        remember: Joi.boolean()
    });

    return loginSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;