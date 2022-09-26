import db from '../config/db'
import { dateNow, sendException } from '../utils'

interface IResult {
  status: boolean
  data: any[]
}

interface ICreate {
  email: string
  first_name: string
  last_name: string
  password: string
}

export const userStoreRepository = async (props: ICreate): Promise<IResult> => {
  const client = await db.connect()
  const time = dateNow()

  try {
    await client.query('BEGIN')

    const getUsers = await client.query(`
    INSERT INTO users ("email", "first_name", "last_name", "password", "created_at", "updated_at") VALUES (
      '${props.email}',
      '${props.first_name}',
      '${props.last_name}',
      '${props.password}',
      '${time}',
      '${time}'
    )`)

    await client.query('COMMIT')
    client.release()
    return {
      status: true,
      data: getUsers.rows,
    }
  } catch (err: any) {
    await client.query('ROLLBACK')
    client.release()
    return {
      status: false,
      data: [sendException(err?.message ?? '')],
    }
  }
}
