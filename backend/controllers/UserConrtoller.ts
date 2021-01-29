import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/UserModel';
import { generateMD5 } from '../utils/generate_hash';
import { sendMail } from '../utils/sendMails';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HTTPError } from '../interface/HttpException';

class UserController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const users = await UserModel.find({}).lean();
      res.json({
        status: 'success',
        data: users
      });
    } catch (error) {
     return next(new HTTPError());
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const userId = req.params.id;

      if (!userId || !Types.ObjectId.isValid(userId)){
        return next(new HTTPError(400, 'Invalid request'));
      }
      const user = await UserModel.findById(userId).lean();

      if (!user){
       return next(new HTTPError(404, 'Not found'));
      }

      res.json({
        status: 'success',
        data: user
      });
    } catch (error) {
     return next(new HTTPError());
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new HTTPError(400, errors.array()[0].msg));
      }

      const {password, fullName, userName, email} = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const data = { 
        fullName, 
        userName, 
        email, 
        confirmHash: generateMD5(process.env.SECRET_CONFIRM_KEY || Math.random().toString())
      };
      const user = await UserModel.create({...data, password: hashPassword});

      await sendMail({
        emailFrom: 'admin@twitter.com', 
        emailTo: data.email,
        subject: 'Подтверждение аккаунта',
        html: `Перейдите по ссылке для подтвержления - <a href="http://localhost:${Number(process.env.PORT) || 5000}/auth/verify?hash=${data.confirmHash}">Подтвердить</a>`
      });

      res.status(201).json({status: 'success', data: user});
    } catch (error) {
     return next(new HTTPError());
    }
  }

  async verify(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        return next(new HTTPError(400, 'Invalid request'))
      }

      const user = await UserModel.findOneAndUpdate({confirmHash: hash.toString()}, {$set: {confirmed: true}});

      if (!user) {
        return next(new HTTPError(401, 'Unauthorized'))
      }

      res.redirect('http://localhost:3000');
    } catch (error) {
     return next(new HTTPError());
    }
  }

  async afterLogin(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      if (req.user){
        res.json({
          status: 'success',
          data: {
            user: {
              ...req.user,
              password: undefined,
              confirmHash: undefined,
            },
            token: jwt.sign({data: req.user}, process.env.JWT_SECRET_KEY || 'LOLIPOP', {expiresIn: '30d'})
          }
        });
      }
    } catch (error) {
     return next(new HTTPError());
    }
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      if (req.user){
        res.json({
          status: 'success',
          data: {
            ...req.user,
            password: undefined,
            confirmHash: undefined
          }
        });
      }
    } catch (error) {
     return next(new HTTPError());
    }
  }
}

export const userController = new UserController();