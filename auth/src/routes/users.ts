import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import {User} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import {validateRequest} from "../middleware/validate-request";
import {currentUser} from "../middleware/current-user";

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email is invalid.'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters.')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      throw new BadRequestError('Email already in use.');
    }

    const user = User.build({email: email, password: password});
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {jwt: userJwt};

    res.status(201).send(user);
  }
);

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      throw new BadRequestError('Email is not registered.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestError('Wrong password.');
    }
    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {jwt: userJwt};

    res.status(200).send(user);
  }
);

router.post('/signout', (req, res) => {
  req.session = null;
  res.send({});
});

router.get('/currentuser', currentUser, (req, res) => {
  res.send({currentUser: req.currentUser || null});
});


export {router as usersRouter};