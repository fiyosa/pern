import { Request, Response } from 'express'
import { compare, dateNow, encryptId, insertQuery, sendError, sendException, sendValidation } from '../utils'
import jwt from 'jsonwebtoken'
import db from '../config/db'
import dotenv from 'dotenv'
dotenv.config()

export const login = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const today = dateNow()
    const expired = dateNow(parseInt(eval(process.env.TIMEOUT_REFRESH_TOKEN ?? '')))

    const { email, password } = req.body

    const getUser = await db.query(`
      SELECT * FROM users
        WHERE "email" = '${email}'
    `)

    if (getUser.rowCount === 0) return sendError(res, 400, 'Account not found.')

    const user = getUser.rows[0]
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) return sendError(res, 400, 'Account invalid.')

    const refreshToken = jwt.sign(
      {
        user_id: encryptId(user.id),
      },
      process.env.REFRESH_TOKEN_SECRETE as string,
      { expiresIn: parseInt(eval(process.env.TIMEOUT_REFRESH_TOKEN ?? '')) || '1d' } // 1 day
    )

    const [authTable, authValue] = insertQuery([
      {
        user_id: user.id,
        revoke: 0,
        refresh_token: refreshToken,
        created_at: today,
        updated_at: today,
        expired_at: expired,
      },
    ])

    const getResponse = await db.query(`
      INSERT INTO auths ${authTable} VALUES ${authValue}
        RETURNING *
    `)

    if (getResponse.rowCount === 0) return sendError(res, 400, 'Something went wrong.')

    const accessToken = jwt.sign(
      {
        user_id: encryptId(user.id),
        auth_id: encryptId(getResponse.rows[0].id ?? ''),
      },
      process.env.ACCESS_TOKEN_SECRETE as string,
      { expiresIn: parseInt(eval(process.env.TIMEOUT_TOKEN ?? '')) || '1m' } // 1 minute or 60s
    )

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        status: true,
        accessToken: accessToken,
        message: 'Token retrieved successfully.',
      })
  } catch (err: any) {
    return sendError(res, 500, sendException(err.message ?? 'Server error.'))
  }
}
