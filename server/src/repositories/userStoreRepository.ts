import db from '../config/db'
import { dateNow, insertQuery, sendException } from '../utils'

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

    const [userTable, userValue] = insertQuery([
      {
        email: props.email,
        first_name: props.first_name,
        last_name: props.last_name,
        password: props.password,
        created_at: time,
        updated_at: time,
      },
    ])

    const getUser = await client.query(`
      INSERT INTO users ${userTable} VALUES ${userValue}
        RETURNING *
    `)

    const [uhrTable, uhrValue] = insertQuery([
      {
        user_id: getUser.rows[0].id,
        role_id: 3,
        created_at: time,
        updated_at: time,
      },
    ])

    await client.query(`
      INSERT INTO user_has_roles ${uhrTable} VALUES ${uhrValue}
    `)

    await client.query('COMMIT')
    client.release()
    return {
      status: true,
      data: [],
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
