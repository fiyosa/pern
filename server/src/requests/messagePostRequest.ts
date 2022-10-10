import { body } from 'express-validator'

export const messagePostRequest = [
  // user_id
  body('user_id').isString().isLength({ min: 2 }),
  // description
  body('description').isString().isLength({ min: 3 }),
]
