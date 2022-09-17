import express from 'express';

import { usersRouter } from './routes/users';

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!!!`);
});