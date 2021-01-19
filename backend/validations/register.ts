import { body } from 'express-validator';

export const registerValidations = [
  body('email', 'Введите email')
    .isEmail().withMessage('Невалидный email')
    .isLength({max: 40, min: 10}).withMessage('Колличество символов от 10 до 40'),

  body('fullName', 'Введите полное имя')
    .isString().withMessage('Неверный формат записи')
    .isLength({max: 40, min: 2}).withMessage('Колличество символов от 2 до 40'),

  body('userName', 'Введите логин')
    .isString().withMessage('Неверный формат записи')
    .isLength({max: 40, min: 2}).withMessage('Колличество символов от 2 до 40'),

  body('password', 'Введите пароль')
    .isString().withMessage('Неверный формат записи')
    .isLength({min: 6}).withMessage('Минимальное колличество символов от 6')
    .custom((value, {req}) => {
      if (value !== req.body.password2) throw new Error('Пароли не совпадают');
      return value;
    })
];