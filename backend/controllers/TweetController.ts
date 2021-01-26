import express from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { TweetModel } from '../models/TweetModel';
import { UserModelDocument } from '../models/UserModel';
import { Types } from 'mongoose';

class TweetsController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweets = await TweetModel.find().sort({createdAt: -1}).populate('user').exec();
      res.json({
        status: 'success',
        data: tweets
      });
    } catch (err) {
      res.status(500).json({
        message: JSON.stringify(err),
        status: 'error'
      });
    }
  }

  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.id;

      if (!id && !Types.ObjectId.isValid(id)){
        res.status(400).send();
        return;
      }

      const tweet = await TweetModel.findById(id).populate('user').exec();

      if (!tweet){
        res.status(404).send();
        return;
      }
      res.json({
        status: 'success',
        data: tweet
      });
    } catch (err) {
      res.status(500).json({
        message: JSON.stringify(err),
        status: 'error'
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

      const { text, images } = req.body;
      const user = req.user as UserModelDocument;

      if (!user){
        res.status(401).send();
        return;
      }
      
      const tweet = await TweetModel.create({text, user: user._id, images});
      res.status(201).json({
        status: 'success',
        data: await tweet.populate('user').execPopulate()
      });
    } catch (err) {
      res.status(500).json({
        message: JSON.stringify(err),
        status: 'error'
      });
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.id;
      const user = req.user as UserModelDocument;

      if (!Types.ObjectId.isValid(id)) {
        res.status(404).send();
        return;
      }

      const tweet = await TweetModel.findById(id).exec();
      if (tweet && tweet.user.toString() === user._id.toString()){
        await tweet.remove();
        res.send();
        return ;
      }

      res.status(401).send();
    } catch (err) {
      res.status(500).json({
        message: JSON.stringify(err),
        status: 'error'
      });
    }
  }

  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const id = req.params.id;
      const { text } = req.body;
      const user = req.user as UserModelDocument;

      if (!Types.ObjectId.isValid(id)) {
        res.status(404).send();
        return;
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
      res.status(500).json({
        message: JSON.stringify(err),
        status: 'error'
      });
    }
  }
};

export const tweetsController = new TweetsController();