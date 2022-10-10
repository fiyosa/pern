import { Request, Response } from 'express'
import { userResource } from '../resources'
import { sendError, sendException, sendResponse, sendSuccess, sendValidation } from '../utils/responseHandler'
import { userStoreRepository } from '../repositories'
import { decryptId, hash, updateQuery } from '../utils'
import db from '../config/db'

const user = async (req: Request, res: Response) => {
  // return sendSuccess(res, 200, {
  //   user: req.headers?.user_id,
  //   auth: req.headers?.auth_id,
  //   user_id: decryptId(req.headers?.user_id as string),
  //   auth_id: decryptId(req.headers?.auth_id as string),
  // })
  try {
    const user_id: string = (req.headers?.user_id as string) || ''

    const getUser = await db.query(`
      SELECT * FROM users
        WHERE "id" = '${decryptId(user_id)}'
    `)

    const getRole = await db.query(`
      SELECT r.id, r.name FROM user_has_roles AS uhr, roles AS r
        WHERE 
          uhr.role_id = r.id AND
          uhr.user_id = ${decryptId(user_id)} 
    `)

    const getBlogs = await db.query(`
      SELECT * FROM blogs
        WHERE "user_id" = ${decryptId(user_id)}
    `)

    const getMessage = await db.query(`
      SELECT * FROM messages
        WHERE "user_id" = ${decryptId(user_id)}
    `)

    if (getUser.rowCount === 0) return sendError(res, 400, 'Account not found.')

    return sendResponse(
      res,
      200,
      userResource(getUser.rows[0], { blog: getBlogs.rows, role: getRole.rows[0], message: getMessage.rows }),
      'Users retrieved successfully.'
    )
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const all = async (req: Request, res: Response) => {
  if (!sendValidation(req, res)) return

  const page: string = (req.query.page as string) || '1'
  const limit: string = (req.query.limit as string) || '10'

  const getUsersCount = await db.query(`
    SELECT COUNT(*) FROM users   
  `)

  const getUsers = await db.query(`
    SELECT * FROM users
      ORDER BY "id"
      OFFSET ${(parseInt(page) - 1) * parseInt(limit)}
      LIMIT ${parseInt(limit)}      
  `)

  if (getUsers.rowCount === 0) return sendError(res, 400, 'User not found.')

  return sendResponse(
    res,
    200,
    getUsers.rows.map((value) => {
      return userResource(value)
    }),
    'Users retrieved successfully.',
    {
      total: getUsersCount.rows[0].count,
    }
  )
}

const find = async (req: Request, res: Response) => {
  try {
    const user_id: string = req.params?.id as string

    const getUser = await db.query(`
      SELECT * FROM users
        WHERE "id" = ${decryptId(user_id)}
    `)

    const getRole = await db.query(`
      SELECT r.id, r.name FROM user_has_roles AS uhr, roles AS r
        WHERE 
          uhr.role_id = r.id AND
          uhr.user_id = ${decryptId(user_id)} 
    `)

    const getBlogs = await db.query(`
      SELECT * FROM blogs
        WHERE "user_id" = ${decryptId(user_id)}
    `)

    const getMessage = await db.query(`
      SELECT * FROM messages
        WHERE "user_id" = ${decryptId(user_id)}
    `)

    if (getUser.rowCount === 0) return sendError(res, 400, 'Account not found.')

    return sendResponse(
      res,
      200,
      userResource(getUser.rows[0], { blog: getBlogs.rows, role: getRole.rows, message: getMessage.rows }),
      'Users retrieved successfully.'
    )
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
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

const update = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const user_id: string = decryptId(req.params.id as string)

    const updateUser: any = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    }

    if (typeof req.body.password !== 'undefined') updateUser.password = await hash(req.body.password)

    await db.query(`
      UPDATE users SET ${updateQuery(updateUser)}
        WHERE id = ${user_id}
    `)

    return sendSuccess(res, 200, 'User updated successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const user_id: string = decryptId(req.params.id as string)

    await db.query(`
      DELETE FROM users WHERE "id" = ${user_id}
    `)

    return sendSuccess(res, 200, 'User deleted successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

export default {
  user,
  all,
  find,
  store,
  update,
  destroy,
}
