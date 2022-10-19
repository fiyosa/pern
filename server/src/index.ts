import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { dateNow, exceptionHandler, generateId, insertQuery, sendError } from './utils'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import db from './config/db'
import routes from './config/routes'
dotenv.config()

const app: Application = express()
const PORT: string | number = process.env.PORT || 4000

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-methods', 'GET, POST, PUT, PATCH, DELETE, OPTION')
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Accept')
  next()
})

app.get('/api/test', (req: Request, res: Response) => {
  const [table, value] = insertQuery([
    {
      id: 1,
      data: 'satu',
      extra: null,
    },
    {
      id: 2,
      data: 'dua',
      extra: null,
    },
  ])
  return res.status(200).json({
    msg: generateId(100),
    now: dateNow(),
    tomorrow: dateNow(parseInt(eval(process.env.TIMEOUT_REFRESH_TOKEN ?? ''))),
    table,
    value,
  })
})

// routes
app.use('/api', routes)

// 404 not found
app.use((_: Request, res: Response) => {
  sendError(res, 404, 'Request not found')
})

// Error handling
app.use((err: exceptionHandler, _: Request, res: Response, __: NextFunction) => {
  const status = err.status || 400
  const message = err.message || 'Error server.'
  sendError(res, status, message)
})

db.connect((err) => {
  if (err) return console.log(err)

  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
    console.log('DB_HOST=', process.env.DB_HOST)
    console.log('DB_PORT=', process.env.DB_PORT)
    console.log('DB_NAME=', process.env.DB_NAME)
    console.log('DB_USER=', process.env.DB_USER)
    console.log('DB_PASS=', process.env.DB_PASS)
    console.log('ACCESS_TOKEN_SECRETE=', process.env.ACCESS_TOKEN_SECRETE)
    console.log('REFRESH_TOKEN_SECRETE=', process.env.REFRESH_TOKEN_SECRETE)
    console.log('TIMEOUT_TOKEN=', process.env.TIMEOUT_TOKEN)
    console.log('TIMEOUT_REFRESH_TOKEN=', process.env.TIMEOUT_REFRESH_TOKEN)
  })
})
