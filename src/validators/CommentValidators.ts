import Joi from 'joi';

export const CommentValidators = Joi.object({
  body: Joi.string().min(3).max(100).required().messages({
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name must be at most {#limit} characters',
    'string.required': 'Name is required',
  }),
  rating: Joi.number().valid(1, 2, 3, 4, 5).required(),
});
