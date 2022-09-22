import { check } from 'express-validator'

export const userPostRequest = [check('email').isEmail(), check('first_name').isString().isLength({ min: 1 })]
