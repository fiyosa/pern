import { writeFileSync } from 'fs'

const pathSp: string = __dirname + '/' + '../store-procedures/'

try {
  const command: string = process.argv[2]
  const nameFile: string = `${command}_sp.sql`

  writeFileSync(
    pathSp + nameFile,
    `CREATE OR REPLACE PROCEDURE "${command}_sp" (\n\t\n)\nLANGUAGE plpgsql\nAS $$\nBEGIN\n\t\nEND $$;`
  )

  console.log(`\n`)
  console.log(nameFile)

  process.exit(0)
} catch (err) {
  console.log(err)
  process.exit(1)
}
