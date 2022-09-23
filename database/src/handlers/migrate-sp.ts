import fs from 'fs'
import db from '../config/db'

const pathSp: string = __dirname + '/' + '../store-procedures/'

;(async () => {
  const client = await db.connect()

  try {
    let check: boolean = true
    const getFileSp = await fs.promises.readdir(pathSp)

    await client.query('BEGIN')

    for (const filename of getFileSp) {
      if (filename.includes('_sp.sql')) {
        try {
          const query: string = await fs.promises.readFile(pathSp + `${filename}`, 'utf8')
          await client.query(query)
        } catch (err: any) {
          check = false
          console.log('\n')
          console.log(`Create store procedure: ` + filename)
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
