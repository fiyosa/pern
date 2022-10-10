import { body } from 'express-validator'

export const categoryPutRequest = [
  // name
  body('name').isString().isLength({ min: 3 }),
]
