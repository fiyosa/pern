import { query } from 'express-validator'

export const userGetRequest = [
  // page
  query('page').isNumeric().optional(),
  // limit
  query('limit').isNumeric().optional(),
]
