import { writeFileSync } from 'fs'

const pathSeed: string = __dirname + '/' + '../seeders/'

try {
  const command: string = process.argv[2]
  const unique = Date.now()

  writeFileSync(pathSeed + `${unique}_${command}_seed.ts`, '')

  console.log(`\n`)
  console.log(`${unique}_${command}_seed.ts`)

  process.exit(0)
} catch (err) {
  console.log(err)
  process.exit(1)
}
