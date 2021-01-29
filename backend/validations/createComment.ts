import { body } from 'express-validator'
import { Types } from 'mongoose';

export const commentValidations = [
  body('owner', 'Нет владельца комментария')
    .custom((value, {req}) => {
      if (!Types.ObjectId.isValid(value)) throw new Error('Неверный id пользователя');
      return value;
    }),

  body('tweetId', 'Нет твита')
    .custom((value, {req}) => {
      if (!Types.ObjectId.isValid(value)) throw new Error('Неверный id твита');
      return value;
    }),
    
  body('text', 'Нет текста')
    .isString().withMessage('Неверный формат текста комментария')
];