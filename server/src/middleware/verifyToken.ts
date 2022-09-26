import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import db from '../config/db'
import { decryptId, sendError, sendException } from '../utils'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    const token: any = authHeader && authHeader.split(' ')[1]

    if (token === null) return sendError(res, 403, 'Unauthorized access.')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE as string, async (err: any, decode: any) => {
      if (err) return sendError(res, 403, 'Unauthorized access.')
      const getAuth = await db.query(`
        SELECT * FROM auths
          WHERE "id" = '${decryptId(decode.auth_id)}' AND "revoke" = 0
      `)
      if (getAuth.rowCount === 0) return sendError(res, 400, 'Unauthorized access.')

      req.headers['user_id'] = decode.user_id
      req.headers['auth_id'] = decode.auth_id
      next()
    })
  } catch (err: any) {
    return sendError(res, 400, sendException(err.message ?? 'Server error.'))
  }
}
