import { readdirSync, readFileSync } from 'fs'
import db from '../config/db'

const pathMigration: string = __dirname + '/' + '../migrations/'

try {
  let query: string = ''

  readdirSync(pathMigration).map((filename) => {
    if (filename.includes('_migration.sql')) query += readFileSync(pathMigration + `${filename}`).toString()
  })

  db.connect((err, client, done) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    client.query(query, (err, result) => {
      done()
      if (err) {
        console.log(err)
        process.exit(1)
      }
      process.exit(0)
    })
  })
} catch (err) {
  console.log(err)
  process.exit(1)
}
