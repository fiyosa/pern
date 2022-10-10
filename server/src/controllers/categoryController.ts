import { Request, Response } from 'express'
import db from '../config/db'
import { categoryResource } from '../resources'
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

const all = async (_: Request, res: Response) => {
  try {
    const getCategories = await db.query(`
      SELECT * FROM categories 
    `)

    return sendResponse(
      res,
      200,
      getCategories.rowCount === 0
        ? []
        : getCategories.rows.map((value) => {
            return categoryResource(value)
          }),
      'Categories retrieved successfully.'
    )
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const find = async (req: Request, res: Response) => {
  try {
    const getCategory = await db.query(`
      SELECT * FROM categories WHERE "id" = ${decryptId(req.params.id)}
    `)

    return sendResponse(res, 200, categoryResource(getCategory.rows[0]), 'Category retrieved successfully.')
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
      INSERT INTO categories ${categoryTable} VALUES ${categoryValue}
    `)

    return sendSuccess(res, 200, 'Category created successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const update = async (req: Request, res: Response) => {
  try {
    if (!sendValidation(req, res)) return

    const getMessage = await db.query(`
      SELECT * FROM categories WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    if (getMessage.rowCount === 0) return sendError(res, 200, 'Category not found.')

    const categoryUpdate = updateQuery({
      name: req.body?.name ?? '',
      description: req.body?.description ?? '',
    })

    await db.query(`
      UPDATE categories SET ${categoryUpdate} WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    return sendSuccess(res, 200, 'Category updated successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const destroy = async (req: Request, res: Response) => {
  try {
    const getCategory = await db.query(`
      SELECT * FROM categories WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)
    if (getCategory.rowCount === 0) return sendError(res, 400, 'Category not found.')

    await db.query(`
      DELETE FROM categories WHERE "id" = ${decryptId(req.params.id) || 'null'}
    `)

    return sendSuccess(res, 200, 'Category deleted successfully.')
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
