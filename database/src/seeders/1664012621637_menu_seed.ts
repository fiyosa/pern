import db from '../config/db'
import { dateNow } from '../utils'

interface IMenus {
  parent_id: number | null
  permission_id: number | null
  name: string
  route_name: string | null
  order: number
}
const menus: IMenus[] = [
  {
    parent_id: null,
    permission_id: null,
    name: 'Public',
    route_name: null,
    order: 1,
  },
  {
    parent_id: null,
    permission_id: null,
    name: 'User',
    route_name: null,
    order: 2,
  },
  {
    parent_id: null,
    permission_id: null,
    name: 'Admin',
    route_name: null,
    order: 3,
  },
  {
    parent_id: 1,
    permission_id: 1,
    name: 'Dashboard',
    route_name: 'dashboard',
    order: 1,
  },
  {
    parent_id: 1,
    permission_id: 2,
    name: 'Blogs',
    route_name: 'blogs',
    order: 2,
  },
  {
    parent_id: 1,
    permission_id: 3,
    name: 'About',
    route_name: 'about',
    order: 3,
  },
  {
    parent_id: 1,
    permission_id: 4,
    name: 'Sign In',
    route_name: 'sign_in',
    order: 4,
  },
  {
    parent_id: 2,
    permission_id: 5,
    name: 'My Blogs',
    route_name: 'my_blogs',
    order: 1,
  },
  {
    parent_id: 3,
    permission_id: 6,
    name: 'View Users',
    route_name: 'view_user',
    order: 1,
  },
  {
    parent_id: 3,
    permission_id: 7,
    name: 'View Blogs',
    route_name: 'view_blogs',
    order: 2,
  },
  {
    parent_id: 3,
    permission_id: 8,
    name: 'View Categories',
    route_name: 'view_categories',
    order: 3,
  },
]

export const menu = async () => {
  const client = await db.connect()

  const time: string = dateNow()

  try {
    await client.query('BEGIN')

    await client.query(`
      INSERT INTO menus ("parent_id", "permission_id", "name", "route_name", "order", "created_at", "updated_at") VALUES
        ${menus
          .map((value) => {
            return `(
                ${value.parent_id},
                ${value.permission_id},
                '${value.name}',
                ${value.route_name ? `'${value.route_name}'` : null},
                ${value.order},
                '${time}',
                '${time}'
              ),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    await client.query('COMMIT')
  } catch (err: any) {
    console.log('seeding: menu')
    console.log(err.message)
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
}
