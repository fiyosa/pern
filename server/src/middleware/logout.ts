import { Request, Response } from 'express'
import db from '../config/db'
import { dateNow, sendError, sendException, sendSuccess } from '../utils'
import dotenv from 'dotenv'
dotenv.config()

export const logout = async (req: Request, res: Response) => {
  try {
    await db.query('BEGIN')

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return sendError(res, 401, 'Unauthorized access.')

    const getAuth = await db.query(`
      SELECT * FROM auths WHERE "refresh_token" = '${refreshToken}'
    `)

    if (getAuth.rowCount === 0) return sendError(res, 401, 'Unauthorized access.')
    const auth = getAuth.rows[0]

    await db.query(`
      UPDATE auths SET
        "revoke" = 1,
        "refresh_token" = null,
        "updated_at" = '${dateNow()}'
        WHERE "id" = ${auth.id}
    `)

    await db.query('COMMIT')
    res.clearCookie('refreshToken')
    return sendSuccess(res, 200, 'Logout successfully.')
  } catch (err: any) {
    await db.query('ROLLBACK')
    return sendError(res, 400, sendException(err.message ?? 'Server error.'))
  }
}
