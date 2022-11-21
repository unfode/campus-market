import mongoose from 'mongoose';

import {app} from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined.');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!`);
  });
};

start();