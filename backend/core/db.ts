import mongoose from 'mongoose';

mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_DB || 'mongodb://localhost:27017/twitter', {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db
  .on('open', () => console.log('DB is open'))
  .on('close', () => console.log('DB is closed'))
  .on('error', (error) => console.log(error));

export {db, mongoose};