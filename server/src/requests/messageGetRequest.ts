import { query } from 'express-validator'

export const messageGetRequest = [
  // page
  query('page').isNumeric().optional(),
  // limit
  query('limit').isNumeric().optional(),
]
