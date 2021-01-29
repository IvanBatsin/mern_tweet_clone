import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { TweetModel } from '../models/TweetModel';
import { UserModelDocument } from '../models/UserModel';
import { Types } from 'mongoose';
import { HTTPError } from '../interface/HttpException';

class TweetsController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const tweets = await TweetModel.find().sort({createdAt: -1}).populate('user').exec();
      res.json({
        status: 'success',
        data: tweets
      });
    } catch (err) {
      return next(new HTTPError());
    }
  }

  async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const id = req.params.id;

      if (!id && !Types.ObjectId.isValid(id)){
        return next(new HTTPError(400, 'Invalid request'));
      }

      const tweet = await TweetModel.findById(id).populate('user').exec();

      if (!tweet){
        return next(new HTTPError(404, 'Not found'));
      }

      res.json({
        status: 'success',
        data: tweet
      });
    } catch (err) {
      return next(new HTTPError());
    }
  }

  async getTweetsById(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const { id } = req.params;

      if (!id || !Types.ObjectId.isValid(id)) {
        return next(new HTTPError(404, 'Not found'));
      }

      const tweets = await TweetModel.find({user: id}).populate('user').sort({createdAt: -1}).exec();

      res.json({
        status: 'success',
        data: tweets
      });
    } catch (error) {
      return next(new HTTPError());
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new HTTPError(400, errors.array()[0].msg))
      }

      const { text, images } = req.body;
      const user = req.user as UserModelDocument;

      if (!user){
        return next(new HTTPError(401, 'Unauthorized'));
      }
      
      const tweet = await TweetModel.create({text, user: user._id, images});
      res.status(201).json({
        status: 'success',
        data: await tweet.populate('user').execPopulate()
      });
    } catch (err) {
      return next(new HTTPError());
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const id = req.params.id;
      const user = req.user as UserModelDocument;

      if (!Types.ObjectId.isValid(id)) {
        return next(new HTTPError(404, 'Not found'));
      }

      const tweet = await TweetModel.findById(id).exec();
      if (tweet && tweet.user.toString() === user._id.toString()){
        await tweet.remove();
        res.send();
        return ;
      }

      res.status(401).send();
    } catch (err) {
      return next(new HTTPError());
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const id = req.params.id;
      const { text } = req.body;
      const user = req.user as UserModelDocument;

      if (!Types.ObjectId.isValid(id)) {
        return next(new HTTPError(404, 'Not found'));
      }

      const tweet = await TweetModel.findById(id).exec();
      if (tweet && tweet.user.toString() === user._id.toString()){
        tweet.text = text;
        await tweet.save();
        res.send();
        return ;
      }

      res.status(401).send();
    } catch (err) {
      return next(new HTTPError());
    }
  }
};

export const tweetsController = new TweetsController();