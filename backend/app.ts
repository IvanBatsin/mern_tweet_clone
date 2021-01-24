import dotenv from 'dotenv';
dotenv.config();
import './core/db';
import express from 'express';
const app: express.Application = express();
// Controllers
import { userController } from './controllers/UserConrtoller';
import { tweetsController } from './controllers/TweetController';
import { fileUploadController } from './controllers/UploadFileController';
// Validators
import { registerValidations } from './validations/register';
import { tweetValidation } from './validations/createTweet';
// Other
import { passport } from './core/passport';
import { idAndUser } from './middleware/user_id';
// multer 
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage});

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
app.get('/tweets', tweetsController.index);
app.get('/tweets/:id', tweetsController.show);
app.post('/tweets', tweetValidation, passport.authenticate('jwt', {session: false}), tweetsController.create);
app.delete('/tweets/:id', passport.authenticate('jwt', {session: false}), idAndUser, tweetsController.delete);
app.patch('/tweets/:id', tweetValidation, passport.authenticate('jwt', {session: false}), idAndUser, tweetsController.update);
// Upload file
app.post('/upload', upload.single('avatar'), passport.authenticate('jwt', {session: false}), fileUploadController.upload);

app.listen(Number(process.env.PORT) || 5000, () => console.log('we on air'));