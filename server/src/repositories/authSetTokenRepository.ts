import db from '../config/db'
import { dateNow, sendException } from '../utils'

interface IResult {
  status: boolean
  data: any[]
}

interface ISetToken {
  id: number | string
  refresh_token: string
}
export const authSetTokenRepository = async (props: ISetToken): Promise<IResult> => {
  const client = await db.connect()
  const today = dateNow()
  const nextMonth = dateNow({ addMonth: 1 })

  try {
    await client.query('BEGIN')

    const getResponse = await client.query(`
      INSERT INTO auths ("user_id", "revoke", "refresh_token", "created_at", "updated_at", "expired_at") VALUES
        (
          ${props.id}, 
          0,
          '${props.refresh_token}',
          '${today}',
          '${today}',
          '${nextMonth}'
        )
        RETURNING *
    `)

    await client.query('COMMIT')
    client.release()
    return {
      status: true,
      data: getResponse.rows,
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
