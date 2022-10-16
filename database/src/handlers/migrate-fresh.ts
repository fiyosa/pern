import fs from 'fs'
import db from '../config/db'

const pathMigration: string = __dirname + '/' + '../migrations/'
const pathDrop: string = __dirname + '/' + '../drops/'

;(async () => {
  try {
    let check: boolean = true
    const getFileDrop = await fs.promises.readdir(pathDrop)
    const getFileMigration = await fs.promises.readdir(pathMigration)

    db.query('BEGIN')

    for (const filename of getFileDrop.reverse()) {
      if (filename.includes('_drop.sql')) {
        try {
          const query: string = await fs.promises.readFile(pathDrop + `${filename}`, 'utf8')
          await db.query(query)
        } catch (err: any) {
          check = false
          console.log('\n')
          console.log(`Create table: ` + filename)
          console.log(err.message)
          break
        }
      }
    }

    for (const filename of getFileMigration) {
      if (filename.includes('_migration.sql')) {
        try {
          const query: string = await fs.promises.readFile(pathMigration + `${filename}`, 'utf8')
          await db.query(query)
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
      await db.query('COMMIT')
    } else {
      await db.query('ROLLBACK')
    }
  } catch (err: any) {
    console.log(err.message)
    await db.query('ROLLBACK')
  }
})().catch((err: any) => {
  console.log(err.message)
})
