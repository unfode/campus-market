import express from 'express';
import 'express-async-errors';
import cookieSession from "cookie-session";

import { usersRouter } from './routes/users';
import {errorHandler, NotFoundError} from "@campus-market/common";

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));

app.use('/api/users', usersRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};