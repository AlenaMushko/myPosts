import Joi from 'joi';

export const LoginValidators = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name must be at most {#limit} characters',
    'string.required': 'Name is required',
  }),
  password: Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,20}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must have at least one uppercase letter, one lowercase letter, one digit, and be between 7 to 20 characters long',
      'string.required': 'Password is required',
    }),
});
