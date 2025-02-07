const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'El nombre de usuario es obligatorio',
        'string.min': 'El nombre de usuario debe cotener al menos 3 caracteres',
        'string.max': 'El nombre de usuario no puede exceder los 30 caracteres'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'Debe de ser un email valido'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe de contener al menos 6 caracteres'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'Debe de ser un email valido'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'La contraseña es obligatioria',
        'string.min': 'La contraseña debe de contener al menos 6 caracteres'
    })
});

const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
  }).or('username', 'email', 'password').messages({
    'object.missing': 'Debe proporcionar al menos un campo para actualizar.',
});

module.exports = { registerSchema, loginSchema, updateUserSchema };