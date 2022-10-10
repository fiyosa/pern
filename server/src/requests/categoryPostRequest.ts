import { body } from 'express-validator'

export const categoryPostRequest = [
  // name
  body('name').isString().isLength({ min: 3 }),
  // description
  body('description').isString().isLength({ min: 3 }),
]
