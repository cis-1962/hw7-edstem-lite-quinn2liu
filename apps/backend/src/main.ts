import express from 'express';
import dotenv from 'dotenv';
import session from 'cookie-session';
import accountRouter from './routes/account';
import questionsRouter from './routes/questions';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const app = express();

app.use(bodyParser.json());

// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});

app.use(session({
  name: 'session',
  keys: ['quinnliu'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use('/account', accountRouter);
app.use('/questions', questionsRouter);

//mongoose boilerplate
const MONGO_URI = process.env.MONGODB_URI || 'INSERT HERE';
mongoose.connect(MONGO_URI);

// to print errors
// const printError = (err, req, res, next) => {
//   console.error(err.stack);
//   next(err);
// };