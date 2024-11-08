const Joi = require('joi');

const register = {
    body: Joi.object({
        email: Joi.string().required().email().messages({
            'string.empty': 'email is required.',
            'any.required': 'email is required.',
        }),
        password: Joi.string().required().custom((value, helpers) => {
            if (value.length < 6) {
                return helpers.message('password must be at least 6 characters long.');
            }
        }).messages({
            'string.empty': 'password is required.',
            'any.required': 'password is required.',
        }),
        name: Joi.string().required().messages({
            'string.empty': 'Name is required.',
            'any.required': 'Name is required.',
        }),
    }),
};


const login = {
    body: Joi.object({
        email: Joi.string().required().email().messages({
            'string.empty': 'email is required.',
            'any.required': 'email is required.',
        }),
        password: Joi.string().required().custom((value, helpers) => {
            if (value.length < 6) {
                return helpers.message('password must be at least 6 characters long.');
            }
        }).messages({
            'string.empty': 'password is required.',
            'any.required': 'password is required.',
        })
    }),
};

module.exports = { register, login };
