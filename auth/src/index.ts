import express from 'express';

import { usersRouter } from './routes/users';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!!!`);
});