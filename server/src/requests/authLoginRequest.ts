import { body } from 'express-validator'

export const authLoginRequest = [body('email').isEmail(), body('password').isString().isLength({ min: 5 })]
