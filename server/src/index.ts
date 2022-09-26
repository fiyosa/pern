import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { dateFormat, dateNow, exceptionHandler, generateId, sendError } from './utils'
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
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Accept, Content-Type')
  next()
})

app.get('/api/test', (req: Request, res: Response) => {
  return res.status(200).json({
    msg: generateId(100),
    now: dateNow(),
    tomorrow: dateNow({ addMonth: 1 }),
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
  })
})
