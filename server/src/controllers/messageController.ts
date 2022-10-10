import { Request, Response } from 'express'
import db from '../config/db'
import { messageResource } from '../resources'
import {
  dateNow,
  decryptId,
  insertQuery,
  sendError,
  sendException,
  sendResponse,
  sendSuccess,
  sendValidation,
  updateQuery,
} from '../utils'

const user = async (req: Request, res: Response) => {
  try {
    const user_id: string = (req.headers?.user_id as string) || ''
    const getMessages = await db.query(`
      SELECT * FROM messages WHERE "id" = ${decryptId(user_id)} ORDER BY "id" DESC
    `)

    return sendResponse(
      res,
      200,
      getMessages.rowCount === 0
        ? []
        : getMessages.rows.map((value) => {
            return messageResource(value)
          }),
      'Messages retrieved successfully.'
    )
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const all = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const page: string = (req.query.page as string) || '1'
    const limit: string = (req.query.limit as string) || '10'

    const getMessages = await db.query(`
      SELECT * FROM messages 
        ORDER BY "id" DESC      
        OFFSET ${(parseInt(page) - 1) * parseInt(limit)}
        LIMIT ${parseInt(limit)} 
    `)

    return sendResponse(
      res,
      200,
      getMessages.rowCount === 0
        ? []
        : getMessages.rows.map((value) => {
            return messageResource(value)
          }),
      'Messages retrieved successfully.'
    )
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const find = async (req: Request, res: Response) => {
  try {
    const getMessages = await db.query(`
      SELECT * FROM messages WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    return sendResponse(res, 200, messageResource(getMessages.rows[0]), 'Message retrieved successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const store = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const today = dateNow()

    const { user_id, description } = req.body

    const [messageTable, messageValue] = insertQuery([
      {
        user_id: decryptId(user_id),
        description: description,
        created_at: today,
        updated_at: today,
      },
    ])

    await db.query(`
      INSERT INTO messages ${messageTable} VALUES ${messageValue}
    `)

    return sendSuccess(res, 200, 'Message created successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const update = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const getMessage = await db.query(`
          SELECT * FROM messages WHERE "id" = ${decryptId(req.params.id) || 'null'}
        `)

    if (getMessage.rowCount === 0) return sendError(res, 200, 'Message not found.')

    const categoryUpdate = updateQuery({
      description: req.body?.description ?? '',
    })

    await db.query(`
      UPDATE messages SET ${categoryUpdate} WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    return sendSuccess(res, 200, 'Message updated successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const getCategory = await db.query(`
      SELECT * FROM messages WHERE "id" = ${decryptId(req.params.id)}
    `)
    if (getCategory.rowCount === 0) return sendError(res, 400, 'Message not found.')

    await db.query(`
      DELETE FROM messages WHERE "id" = ${decryptId(req.params.id)}
    `)

    return sendSuccess(res, 200, 'Message deleted successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const updateView = async (req: Request, res: Response) => {
  try {
    const user_id: string = (req.headers?.user_id as string) || ''

    const categoryUpdate = updateQuery({
      is_view: 1,
    })

    await db.query(`
      UPDATE messages SET ${categoryUpdate} WHERE "id" =  ${decryptId(user_id) || 'null'}
    `)

    return sendSuccess(res, 200, 'Message updated successfully.')
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
  updateView,
}
