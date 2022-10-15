import { Client, Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const db = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_Name,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
})

export default db
