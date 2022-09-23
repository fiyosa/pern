import { writeFileSync } from 'fs'

const pathSeed: string = __dirname + '/' + '../seeders/'

try {
  const command: string = process.argv[2]
  const unique = Date.now()
  const nameFile: string = `${unique}_${command}_seed.ts`

  writeFileSync(pathSeed + nameFile, '')

  console.log(`\n`)
  console.log(nameFile)

  process.exit(0)
} catch (err) {
  console.log(err)
  process.exit(1)
}
