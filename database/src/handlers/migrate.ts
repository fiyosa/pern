import fs from 'fs'
import db from '../config/db'

const pathMigration: string = __dirname + '/' + '../migrations/'

;(async () => {
  const client = await db.connect()

  try {
    let check: boolean = true
    const getFileMigration = await fs.promises.readdir(pathMigration)

    await client.query('BEGIN')

    for (const filename of getFileMigration) {
      if (filename.includes('_migration.sql')) {
        try {
          const query: string = await fs.promises.readFile(pathMigration + `${filename}`, 'utf8')
          await client.query(query)
        } catch (err: any) {
          check = false
          console.log('\n')
          console.log(`Create table: ` + filename)
          console.log(err.message)
          break
        }
      }
    }

    if (check) {
      await client.query('COMMIT')
    } else {
      await client.query('ROLLBACK')
    }
  } catch (err: any) {
    console.log(err)
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
})().catch((err: any) => {
  console.log(err.message)
})
