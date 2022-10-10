import { body } from 'express-validator'

export const messagePutRequest = [
  // description
  body('description').isString().isLength({ min: 3 }),
]
