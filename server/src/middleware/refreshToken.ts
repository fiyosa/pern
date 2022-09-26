import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import db from '../config/db'
import { dateNow, encryptId, sendError, sendException } from '../utils'
import dotenv from 'dotenv'
dotenv.config()

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return sendError(res, 401, 'Unauthorized access.')

    const getAuth = await db.query(`
      SELECT * FROM auths
        WHERE "refresh_token" = '${refreshToken}' AND "revoke" = 0
    `)

    if (getAuth.rowCount === 0) return sendError(res, 401, 'Unauthorized access.')
    const auth = getAuth.rows[0]

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE as string, async (err: any, decode: any) => {
      if (err) return sendError(res, 403, 'Unauthorized access.')

      await db.query(`
        UPDATE auths SET
          "updated_at" = '${dateNow()}'
          WHERE "id" = '${auth.id}'
      `)

      const accessToken = jwt.sign(
        {
          user_id: encryptId(auth.user_id ?? ''),
          auth_id: encryptId(auth.id ?? ''),
        },
        process.env.ACCESS_TOKEN_SECRETE as string,
        { expiresIn: process.env.TIMEOUT_TOKEN ?? '1m' } // 1 minute or 60s
      )
      return res.status(200).json({
        status: true,
        accessToken: accessToken,
        message: 'Token retrieved successfully.',
      })
    })
  } catch (err: any) {
    return sendError(res, 400, sendException(err.message ?? 'Server error.'))
  }
}
