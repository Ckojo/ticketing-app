import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-request'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid!'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must provide a password!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    )

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    )

    // Store token on session object
    req.session = {
      jwt: token,
    }

    res.status(200).send(existingUser)
  }
)

export { router as signInRouter }
