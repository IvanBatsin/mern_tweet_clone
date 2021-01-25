import { body } from 'express-validator';

export const tweetValidation = [
  body('text', 'Введите текст сообщения')
    .isString()
    .isLength({max: 280})
    .withMessage('Недопустимое колличество символов'),
  body('images', 'Неверный формат')
    .isArray()
    .withMessage('Неверный формат изображений')
]; 