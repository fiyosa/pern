import db from '../config/db'
import { dateNow } from '../utils'

export const category = async () => {
  const client = await db.connect()
  const time: string = dateNow()

  try {
    await client.query('BEGIN')

    await client.query(`
      INSERT INTO categories ("user_id", "name", "description", "created_at", "updated_at") VALUES
        (1, 'Programming', 'This is for development fullstack', '${time}', '${time}')
    `)

    await client.query('COMMIT')
  } catch (err: any) {
    console.log('seeding: category')
    console.log(err.message)
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
}
