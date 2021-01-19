import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/UserModel';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

passport.use(new LocalStrategy(async (username, password, done): Promise<void> => {
  try {
    const user = await UserModel.findOne({ $or: [{email: username}, {userName: username}]}).exec();
   
    if (!user || !user.confirmed){
      return done(null, false, {message: 'Not any user'});
    }

    const passwordCompare = await bcrypt.compare(password, user.toObject().password);

    if (!passwordCompare) {
      return done(null, false, {message: 'Password not equals'});
    }

    return done(null, user.toObject());
  } catch (err) {
    console.log(err);
    done(err)
  }
}));


passport.use(new JwtStrategy({
  secretOrKey: process.env.JWT_SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromHeader('token')
}, async (token, done) => {
  try {
    const user = await UserModel.findById(token.data._id);
    if (!user){
      return done(null, false);
    }
    
    done(null, user.toObject());
  } catch (error) {
    return done(error, false);
  }
}));

interface IUser {
  password: string,
  userName: string,
  fullName: string,
  email: string,
  confirmHash: string,
  confirmed: boolean,
  _id: mongoose.Types.ObjectId
}

passport.serializeUser((user: IUser, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id).lean();
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

export { passport, IUser }