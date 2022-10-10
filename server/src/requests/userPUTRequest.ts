import { body } from 'express-validator'

export const userPUTRequest = [
  body('first_name').isString().isLength({ min: 3 }),
  body('last_name').isString().isLength({ min: 3 }),
  body('password').isString().isLength({ min: 5 }).optional(),
]
