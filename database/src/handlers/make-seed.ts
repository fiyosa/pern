import { writeFileSync } from 'fs'

const pathSeed: string = __dirname + '/' + '../seeders/'
const content = (nameFile: string) => {
  return `import db from '../config/db'

export const ${nameFile} = async () => {
  const client = await db.connect()

  try {
    await client.query('BEGIN')

    await client.query('')

    await client.query('COMMIT')
  } catch (err: any) {
    console.log('seeding: ${nameFile}')
    console.log(err.message)
    await client.query('ROLLBACK')
  } finally {
    client.release()
  }
}
`
}

try {
  const command: string = process.argv[2]
  const unique = Date.now()
  const nameFile: string = `${unique}_${command}_seed.ts`

  writeFileSync(pathSeed + nameFile, content(command))

  console.log(`\n`)
  console.log(nameFile)

  process.exit(0)
} catch (err) {
  console.log(err)
  process.exit(1)
}
