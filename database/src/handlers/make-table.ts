import { writeFileSync } from 'fs'

const pathMigration: string = __dirname + '/' + '../migrations/'
const pathDrop: string = __dirname + '/' + '../drops/'

try {
  const command: string = process.argv[2]
  const unique = Date.now()

  writeFileSync(pathMigration + `${unique}_${command}_migration.sql`, `CREATE TABLE IF NOT EXISTS ${command} (\n\n);`)
  writeFileSync(pathDrop + `${unique}_${command}_drop.sql`, `DROP TABLE IF EXISTS ${command};`)

  console.log(`\n`)
  console.log(`${unique}_${command}_migration.sql`)
  console.log(`${unique}_${command}_drop.sql`)

  process.exit(0)
} catch (err) {
  console.log(err)
  process.exit(1)
}
