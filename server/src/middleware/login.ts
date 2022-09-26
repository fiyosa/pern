import { Request, Response } from 'express'
import { compare, encryptId, sendError, sendException, sendValidation } from '../utils'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authSetTokenRepository } from '../repositories'
import db from '../config/db'
dotenv.config()

export const login = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const { email, password } = req.body
    // console.log(email, password)
    // return res.json({ masuk: 'oke' })

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
      { expiresIn: process.env.TIMEOUT_REFRESH_TOKEN ?? '1d' } // 1 day
    )

    const getResponse = await authSetTokenRepository({
      id: user.id,
      refresh_token: refreshToken,
    })

    if (!getResponse.status) return sendError(res, 400, getResponse.data[0])

    const accessToken = jwt.sign(
      {
        user_id: encryptId(user.id),
        auth_id: encryptId(getResponse.data[0].id ?? ''),
      },
      process.env.ACCESS_TOKEN_SECRETE as string,
      { expiresIn: process.env.TIMEOUT_TOKEN ?? '1m' } // 1 minute or 60s
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
    return sendError(res, 400, sendException(err.message ?? 'Server error.'))
  }
}
