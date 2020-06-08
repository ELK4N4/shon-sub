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

//New Project Validation
const newProjectValidation = (data) => {
    const projectSchema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        englishName: Joi.string(),
        japaneseName: Joi.string(),
        genre: Joi.string(),
        process: Joi.string().min(2).max(20).required(),
        episodesNumber: Joi.number(),
        summary: Joi.string(),
        coverImageName: Joi.string()
    });

    return projectSchema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.newProjectValidation = newProjectValidation;