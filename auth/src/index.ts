import mongoose from 'mongoose';

import {app} from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined.');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (error) {
    console.error(error);
  }
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!`);
  });
};

start();