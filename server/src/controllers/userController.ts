import { Request, Response } from 'express'
import { userResource } from '../resources'
import { sendError, sendException, sendResponse, sendSuccess, sendValidation } from '../utils/responseHandler'
import { userRepository, userStoreRepository } from '../repositories'
import { decryptId, hash } from '../utils'
import db from '../config/db'

const user = async (req: Request, res: Response) => {
  return sendSuccess(res, 200, {
    user: req.headers?.user_id,
    auth: req.headers?.auth_id,
    user_id: decryptId(req.headers?.user_id as string),
    auth_id: decryptId(req.headers?.auth_id as string),
  })
  try {
    const getUser = await db.query(`
      SELECT * FROM users
        WHERE "id" = '${decryptId(req.headers?.user_id as string)}'
    `)

    if (getUser.rowCount === 0) return sendError(res, 400, 'Account not found.')

    return sendResponse(res, 200, userResource(getUser.rows[0]), 'Users retrieved successfully.')
  } catch (err: any) {
    return sendError(res, 400, sendException(err?.message ?? 'Server error.'))
  }
}

const all = async (req: Request, res: Response) => {
  if (!sendValidation(req, res)) return

  const page: string = (req.query.page as string) || '1'
  const limit: string = (req.query.limit as string) || '10'

  const getUsers = await userRepository({
    page: parseInt(page),
    limit: parseInt(limit),
  })

  if (!getUsers.status) return sendError(res, 400, getUsers.data[0])

  return sendResponse(
    res,
    200,
    getUsers.data.length !== 0
      ? getUsers.data.map((value) => {
          return userResource(value)
        })
      : [],
    'Users retrieved successfully.'
  )
}

const find = (req: Request, res: Response) => {
  return sendResponse(res, 200, {}, 'User retrieved successfully.')
}

const store = async (req: Request, res: Response) => {
  if (!sendValidation(req, res)) return

  const { email, first_name, last_name, password } = req.body

  const resUser = await userStoreRepository({
    email,
    first_name,
    last_name,
    password: await hash(password),
  })

  if (!resUser.status) return sendError(res, 400, resUser.data[0])

  return sendSuccess(res, 200, 'User created successfully.')
}

const update = (req: Request, res: Response) => {
  return sendResponse(res, 200, {}, 'User updated successfully.')
}

const destroy = (req: Request, res: Response) => {
  return sendResponse(res, 200, {}, 'User deleted successfully.')
}

export default {
  user,
  all,
  find,
  store,
  update,
  destroy,
}
