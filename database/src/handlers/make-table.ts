import { writeFileSync } from 'fs'

const pathMigration: string = __dirname + '/' + '../migrations/'
const pathDrop: string = __dirname + '/' + '../drops/'

try {
  const command: string = process.argv[2]
  const unique = Date.now()
  const nameFileMigration: string = `${unique}_${command}_migration.sql`
  const nameFileDrop: string = `${unique}_${command}_drop.sql`

  writeFileSync(pathMigration + nameFileMigration, `CREATE TABLE IF NOT EXISTS "${command}" (\n\n);`)
  writeFileSync(pathDrop + nameFileDrop, `DROP TABLE IF EXISTS "${command}";`)

  console.log(`\n`)
  console.log(nameFileMigration)
  console.log(nameFileDrop)

  process.exit(0)
} catch (err) {
  console.log(err)
  process.exit(1)
}
