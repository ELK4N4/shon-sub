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

//Project Validation
const projectValidation = (data) => {
    const projectSchema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        englishName: Joi.string().allow(''),
        japaneseName: Joi.string().allow(''),
        genre: Joi.string().allow(''),
        process: Joi.string().min(2).max(20).required(),
        episodesNumber: Joi.number().allow(''),
        summary: Joi.string().allow(''),
        coverImageName: Joi.string().allow('')
    });

    return projectSchema.validate(data);
};

//Episode Validation
const episodeValidation = (data) => {
    const episodeSchema = Joi.object({
        episodeName: Joi.string().min(2).max(30).required(),
        episodeNumber: Joi.number().required(),
        link: Joi.string().required(),
        coverImageName: Joi.string()
    });

    return episodeSchema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.newProjectValidation = projectValidation;
module.exports.projectValidation = projectValidation;
module.exports.episodeValidation = episodeValidation;