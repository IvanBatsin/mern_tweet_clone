import dotenv from 'dotenv';
dotenv.config();
import './core/db';
import express from 'express';
const app: express.Application = express();
// Controllers
import { userController } from './controllers/UserConrtoller';
import { tweetsController } from './controllers/TweetController';
import { fileUploadController } from './controllers/UploadFileController';
import { commentController } from './controllers/CommentController';
// Validators
import { registerValidations } from './validations/register';
import { tweetValidation } from './validations/createTweet';
import { commentValidations } from './validations/createComment';
// Other
import { passport } from './core/passport';
import { idAndUser } from './middleware/user_id';
// multer 
import multer from 'multer';
import { HTTPError } from './interface/HttpException';
const storage = multer.memoryStorage();
const upload = multer({storage});
// App middlewres
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());

// Users routes
app.get('/users', userController.index);
app.get('/users/me', passport.authenticate('jwt', {session: false}), userController.getUserInfo);
app.get('/users/:id', userController.show);
// Auth routes
app.get('/auth/verify', userController.verify);
app.post('/auth/register', registerValidations, userController.create);
app.post('/auth/login', passport.authenticate('local'), userController.afterLogin);
// Tweets routes
app.get('/tweets', passport.authenticate('jwt', {session: false}), tweetsController.index);
app.get('/tweets/:id', passport.authenticate('jwt', {session: false}), tweetsController.show);
app.get('/tweets/user/:id', passport.authenticate('jwt', {session: false}), tweetsController.getTweetsById);
app.post('/tweets', tweetValidation, passport.authenticate('jwt', {session: false}), tweetsController.create);
app.delete('/tweets/:id', passport.authenticate('jwt', {session: false}), idAndUser, tweetsController.delete);
app.patch('/tweets/:id', tweetValidation, passport.authenticate('jwt', {session: false}), idAndUser, tweetsController.update);
// Upload file route
app.post('/upload', upload.single('image'), passport.authenticate('jwt', {session: false}), fileUploadController.upload);
// Comment routes
app.get('/comments/:tweetId', passport.authenticate('jwt', {session: false}), commentController.index);
app.post('/comments', passport.authenticate('jwt', {session: false}), commentValidations, commentController.create);

// Error Handler
app.use((error: HTTPError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = error.status;
  const message = error.message;

  res.status(status).json({
    status: 'error',
    message
  });
})

app.listen(Number(process.env.PORT) || 5000, () => console.log('we on air'));