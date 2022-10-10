import { Request, Response } from 'express'
import { sendError, sendException, sendResponse } from '../utils/responseHandler'
import { decryptId } from '../utils'
import db from '../config/db'

const Public = async (req: Request, res: Response) => {
  try {
    const getMenus = await db.query(`
      SELECT m.* FROM menus AS m
        WHERE 
          m.parent_id IS NULL OR
          m.permission_id IN (
            SELECT p.id FROM permissions AS p, role_has_permissions AS rhp, roles AS r
              WHERE 
                p.id = rhp.permission_id AND
                rhp.role_id = r.id AND
                r.name = 'guest'   
          )           
          ORDER BY "order" 
    `)

    if (getMenus.rowCount === 0) return sendError(res, 400, 'Menus not found.')

    const parent: any = {}
    for (const value of getMenus.rows) {
      if (value.parent_id === null) {
        parent[value.name] = value.id
      }
    }

    const allMenus: any = {}
    for (const key in parent) {
      for (const value of getMenus.rows) {
        if (!allMenus.hasOwnProperty(key)) {
          allMenus[key] = []
        }
        if (value.parent_id === parent[key]) {
          allMenus[key].push({
            name: value.name,
            route_name: value.route_name,
          })
        }
      }
    }

    return sendResponse(res, 200, allMenus, 'Users retrieved successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

const Auth = async (req: Request, res: Response) => {
  try {
    const user_id: string = decryptId(req.headers?.user_id as string) || ''

    const getMenus = await db.query(`
      SELECT m.* FROM menus AS m
        WHERE 
          m.parent_id IS NULL OR
          m.permission_id IN (
            SELECT p.id FROM permissions AS p, role_has_permissions AS rhp, roles AS r, user_has_roles AS uhr
              WHERE 
                p.id = rhp.permission_id AND
                rhp.role_id = r.id AND
                r.id = uhr.role_id AND
                uhr.user_id = ${user_id}     
          )           
          ORDER BY "order" 
    `)

    if (getMenus.rowCount === 0) return sendError(res, 400, 'Menus not found.')

    const parent: any = {}
    for (const value of getMenus.rows) {
      if (value.parent_id === null) {
        parent[value.name] = value.id
      }
    }

    const allMenus: any = {}
    for (const key in parent) {
      for (const value of getMenus.rows) {
        if (!allMenus.hasOwnProperty(key)) {
          allMenus[key] = []
        }
        if (value.parent_id === parent[key] && value.name !== 'Sign In') {
          allMenus[key].push({
            name: value.name,
            route_name: value.route_name,
          })
        }
      }
    }

    return sendResponse(res, 200, allMenus, 'Users retrieved successfully.')
  } catch (err: any) {
    return sendError(res, 500, sendException(err?.message ?? 'Server error.'))
  }
}

export default {
  Public,
  Auth,
}
