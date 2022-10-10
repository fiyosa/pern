import db from '../config/db'
import { dateNow, hash } from '../utils'

interface IUser {
  email: string
  first_name: string
  last_name: string
  password: string
}

export const user = async () => {
  const client = await db.connect()
  const time: string = dateNow()
  const hashPassword = await hash('password')

  const users: IUser[] = [
    {
      email: 'superadmin@gmail.com',
      first_name: 'Super',
      last_name: 'Admin',
      password: hashPassword,
    },
    {
      email: 'admin@gmail.com',
      first_name: 'Admin',
      last_name: 'Admin',
      password: hashPassword,
    },
    {
      email: 'user@gmail.com',
      first_name: 'User',
      last_name: 'User',
      password: hashPassword,
    },
  ]

  try {
    await client.query('BEGIN')

    await client.query(`
      INSERT INTO users ("email", "first_name", "last_name", "password", "created_at", "updated_at") VALUES
        ${users
          .map((user) => {
            return `('${user.email}','${user.first_name}','${user.last_name}','${user.password}','${time}','${time}'),`
          })
          .join('')
          .slice(0, -1)}
    ;`)

    await client.query('COMMIT')
  } catch (err: any) {
    console.log('seeding: user')
    console.log(err.message)
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
}
