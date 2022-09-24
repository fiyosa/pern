import db from '../config/db'
import { dateNow } from '../utils'

export const role_permission = async () => {
  const client = await db.connect()
  const time: string = dateNow()

  const roles: string[] = ['super admin', 'admin', 'user', 'guest']
  const permissions: string[] = [
    'menu_dashboard',
    'menu_blogs',
    'menu_about',
    'menu_signin',
    'menu_all_blogs',
    'menu_view_user',
    'menu_view_blogs',
    'menu_view_categories',

    'user_view_any',
    'user_view',
    'user_create',
    'user_edit',
    'user_delete',

    'role_view_any',
    'role_view',
    'role_create',
    'role_edit',
    'role_delete',

    'blog_view_any',
    'blog_view',
    'blog_create',
    'blog_edit',
    'blog_delete',

    'category_view_any',
    'category_view',
    'category_create',
    'category_edit',
    'category_delete',

    'message_view_any',
    'message_view',
    'message_create',
    'message_edit',
    'message_delete',
  ]

  const adminPermissions: string[] = [
    'menu_dashboard',
    'menu_blogs',
    'menu_about',
    'menu_all_blogs',
    'menu_view_blogs',
    'menu_view_categories',

    'user_view_any',
    'user_edit',

    'blog_view_any',
    'blog_view',
    'blog_create',
    'blog_edit',
    'blog_delete',

    'category_view_any',
    'category_view',
    'category_create',
    'category_edit',
    'category_delete',

    'message_view_any',
    'message_view',
    'message_create',
    'message_edit',
    'message_delete',
  ]

  const userPermissions: string[] = [
    'menu_dashboard',
    'menu_blogs',
    'menu_about',
    'menu_all_blogs',

    'user_view',
    'user_edit',

    'blog_view_any',
    'blog_view',
    'blog_create',
    'blog_edit',
    'blog_delete',

    'category_view_any',

    'message_view_any',
  ]

  const guestPermissions: string[] = ['menu_dashboard', 'menu_blogs', 'menu_about', 'menu_signin', 'user_create']

  try {
    await client.query('BEGIN')

    await client.query(`
      INSERT INTO permissions (name, created_at, updated_at) VALUES
        ${permissions
          .map((permission) => {
            return `('${permission}','${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    await client.query(`
      INSERT INTO roles (name, created_at, updated_at) VALUES
        ${roles
          .map((role) => {
            return `('${role}','${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    const getUsers = await client.query('SELECT * FROM users;')
    const getRoles = await client.query('SELECT * FROM roles;')
    const getPermission = await client.query('SELECT * FROM permissions')

    const user_role: { user_id: string; role_id: string }[] = []
    for (const user of getUsers.rows) {
      for (const role of getRoles.rows) {
        if (role.name === 'super admin' && user.email === 'superadmin@gmail.com') {
          user_role.push({
            user_id: user.id,
            role_id: role.id,
          })
        } else if (role.name === 'admin' && user.email === 'admin@gmail.com') {
          user_role.push({
            user_id: user.id,
            role_id: role.id,
          })
        } else if (role.name === 'user' && user.email === 'user@gmail.com') {
          user_role.push({
            user_id: user.id,
            role_id: role.id,
          })
        }
      }
    }
    if (user_role.length !== 0)
      await client.query(`
      INSERT INTO user_has_roles ("user_id", "role_id", "created_at", "updated_at") VALUES
        ${user_role
          .map((value) => {
            return `('${value.user_id}','${value.role_id}','${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    const super_admin_role_permission: { role_id: string; permission_id: string }[] = []
    for (const permission of getPermission.rows) {
      for (const role of getRoles.rows) {
        if (role.name === 'super admin') {
          super_admin_role_permission.push({
            role_id: role.id,
            permission_id: permission.id,
          })
        }
      }
    }
    if (super_admin_role_permission.length !== 0)
      await client.query(`
      INSERT INTO role_has_permissions ("role_id", "permission_id", "created_at", "updated_at") VALUES
        ${super_admin_role_permission
          .map((value) => {
            return `(${value.role_id},${value.permission_id},'${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    const admin_role_permission: { role_id: string; permission_id: string }[] = []
    for (const permission of getPermission.rows) {
      for (const role of getRoles.rows) {
        if (role.name === 'admin' && adminPermissions.includes(permission.name)) {
          admin_role_permission.push({
            role_id: role.id,
            permission_id: permission.id,
          })
        }
      }
    }
    if (admin_role_permission.length !== 0)
      await client.query(`
      INSERT INTO role_has_permissions ("role_id", "permission_id", "created_at", "updated_at") VALUES
        ${admin_role_permission
          .map((value) => {
            return `('${value.role_id}','${value.permission_id}','${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    const user_role_permission: { role_id: string; permission_id: string }[] = []
    for (const permission of getPermission.rows) {
      for (const role of getRoles.rows) {
        if (role.name === 'user' && userPermissions.includes(permission.name)) {
          user_role_permission.push({
            role_id: role.id,
            permission_id: permission.id,
          })
        }
      }
    }
    if (user_role_permission.length !== 0)
      await client.query(`
      INSERT INTO role_has_permissions ("role_id", "permission_id", "created_at", "updated_at") VALUES
        ${user_role_permission
          .map((value) => {
            return `('${value.role_id}','${value.permission_id}','${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    const guest_role_permission: { role_id: string; permission_id: string }[] = []
    for (const permission of getPermission.rows) {
      for (const role of getRoles.rows) {
        if (role.name === 'guest' && guestPermissions.includes(permission.name)) {
          guest_role_permission.push({
            role_id: role.id,
            permission_id: permission.id,
          })
        }
      }
    }
    if (guest_role_permission.length !== 0)
      await client.query(`
      INSERT INTO role_has_permissions ("role_id", "permission_id", "created_at", "updated_at") VALUES
        ${guest_role_permission
          .map((value) => {
            return `('${value.role_id}','${value.permission_id}','${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    await client.query('COMMIT')
  } catch (err: any) {
    console.log('seeding: role_permission')
    console.log(err.message)
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
}
