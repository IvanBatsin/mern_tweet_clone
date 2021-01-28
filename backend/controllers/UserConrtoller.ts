import express from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/UserModel';
import { generateMD5 } from '../utils/generate_hash';
import { sendMail } from '../utils/sendMails';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).lean();
      res.json({
        status: 'success',
        data: users
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error)
      });
    }
  }

  async show(req: any, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!userId || !Types.ObjectId.isValid(userId)){
        res.status(400).send();
        return;
      }
      const user = await UserModel.findById(userId).lean();

      if (!user){
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error)
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({status:400, errors: errors.array()})
        return;
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
        html: `Перейдите по ссылке для подтвержления <a href="http://localhost:${Number(process.env.PORT) || 5000}/auth/verify?hash=${data.confirmHash}">Подтвердить</a>`
      });

      res.status(201).json({status: 'success', data: user});
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error)
      });
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const hash = req.query.hash;

      if (!hash) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findOneAndUpdate({confirmHash: hash.toString()}, {$set: {confirmed: true}});

      if (!user) {
        res.status(401).send();
        return ;
      }

      // res.json({status: 'success'});
      res.redirect('http://localhost:3000');
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error)
      });
    }
  }

  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (req.user){
        res.json({
          status: 'success',
          data: {
            ...req.user,
            password: undefined,
            confirmHash: undefined,
            token: jwt.sign({data: req.user}, process.env.JWT_SECRET_KEY || 'LOLIPOP', {expiresIn: '30d'})
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error)
      });
    }
  }

  async getUserInfo(req: express.Request, res: express.Response): Promise<void> {
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
      res.status(500).json({
        status: 'error',
        message: JSON.stringify(error)
      });
    }
  }
}

export const userController = new UserController();