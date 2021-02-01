import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { CommentModel } from '../models/CommentModel';
import { HTTPError } from '../interface/HttpException';
import { Types } from 'mongoose';

class CommentController {
  async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const { tweetId } = req.params;

      if (!Types.ObjectId.isValid(tweetId)) {
        return next(new HTTPError(400, 'Invalid tweet id'));
      }

      const comments = await CommentModel.find({tweetId}).sort({createdAt: -1}).populate('owner').exec();

      res.json({
        status: 'success',
        data: comments
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

      const {text, owner, tweetId} = req.body;

      const comment = new CommentModel({text, owner, tweetId});
      await comment.save();

      res.status(201).json({
        status: 'success',
        data: comment
      });
    } catch (error) {
      return next(new HTTPError());
    }
  }
}

export const commentController = new CommentController();