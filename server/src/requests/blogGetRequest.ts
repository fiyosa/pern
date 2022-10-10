import { query } from 'express-validator'

export const blogGetRequest = [
  // page
  query('page').isNumeric().optional(),
  // limit
  query('limit').isNumeric().optional(),
]
