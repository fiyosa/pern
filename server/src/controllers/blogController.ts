import { Request, Response } from 'express'
import db from '../config/db'
import { blogResource } from '../resources'
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

const all = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const page: string = (req.query.page as string) || '1'
    const limit: string = (req.query.limit as string) || '10'

    const getBlogs = await db.query(`
      SELECT * FROM blogs 
        ORDER BY "id" DESC      
        OFFSET ${(parseInt(page) - 1) * parseInt(limit)}
        LIMIT ${parseInt(limit)} 
    `)

    return sendResponse(
      res,
      200,
      getBlogs.rowCount === 0
        ? []
        : getBlogs.rows.map((value) => {
            return blogResource(value)
          }),
      'Blogs retrieved successfully.'
    )
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const find = async (req: Request, res: Response) => {
  try {
    const getBlog = await db.query(`
      SELECT * FROM blogs WHERE "id" = ${decryptId(req.params.id)}
    `)

    return sendResponse(res, 200, blogResource(getBlog.rows[0]), 'Blog retrieved successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const store = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const today = dateNow()

    const user_id: string = (req.headers?.user_id as string) || ''

    const [categoryTable, categoryValue] = insertQuery([
      {
        user_id: decryptId(user_id),
        name: req.body?.name ?? '',
        description: req.body?.description ?? '',
        created_at: today,
        updated_at: today,
      },
    ])

    await db.query(`
      INSERT INTO blogs ${categoryTable} VALUES ${categoryValue}
    `)

    return sendSuccess(res, 200, 'Blog created successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const update = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const getMessage = await db.query(`
      SELECT * FROM blogs WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    if (getMessage.rowCount === 0) return sendError(res, 200, 'Blog not found.')

    const categoryUpdate = updateQuery({
      name: req.body?.name ?? '',
      description: req.body?.description ?? '',
    })

    await db.query(`
      UPDATE blogs SET ${categoryUpdate} WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    return sendSuccess(res, 200, 'Blog updated successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const getBlog = await db.query(`
      SELECT * FROM blogs WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)
    if (getBlog.rowCount === 0) return sendError(res, 400, 'Blog not found.')

    await db.query(`
      DELETE FROM blogs WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    return sendSuccess(res, 200, 'Blog deleted successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

export default {
  all,
  find,
  store,
  update,
  destroy,
}
