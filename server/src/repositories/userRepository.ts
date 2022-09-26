import db from '../config/db'
import { dateNow, sendException } from '../utils'

interface IResult {
  status: boolean
  data: any[]
}

interface IAll {
  page: number
  limit: number
}
export const userRepository = async (props: IAll): Promise<IResult> => {
  const client = await db.connect()

  try {
    await client.query('BEGIN')

    const getUsers = await client.query(`
      SELECT * FROM users
        ORDER BY "id"
        OFFSET ${(props.page - 1) * props.limit}
        LIMIT ${props.limit}      
    `)

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
