import Joi from 'joi';

export const PostValidators = Joi.object({
  title: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name must be at most {#limit} characters',
    'string.required': 'Name is required',
  }),
  body: Joi.string().min(3).max(100).required().messages({
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name must be at most {#limit} characters',
    'string.required': 'Name is required',
  }),
});
