import { Request, Response } from 'express'
import db from '../config/db'
import { roleResource } from '../resources'
import { sendError, sendException, sendResponse } from '../utils'

const all = async (req: Request, res: Response) => {
  try {
    const getRoles = await db.query(`
      SELECT * FROM roles WHERE "name" <> 'guest'
    `)

    return sendResponse(
      res,
      200,
      getRoles.rowCount === 0
        ? []
        : getRoles.rows.map((value) => {
            return roleResource(value)
          }),
      'Roles retrieved successfully.'
    )
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

export default {
  all,
}
