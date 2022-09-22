import { readdirSync, readFileSync } from 'fs'
import db from '../config/db'

const pathDrop: string = __dirname + '/' + '../drops/'

try {
  let query: string = ''

  readdirSync(pathDrop).map((filename) => {
    if (filename.includes('_drop.sql')) query += readFileSync(pathDrop + `${filename}`).toString()
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
