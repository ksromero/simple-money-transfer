import express, { NextFunction, Request, Response }  from 'express'
import connectDB from './database/monggoConnection'
import config from './config'
import apiRouter from './routers/api'
import { handleError } from './shared/app.error'
import seed from './database/seeds'
import cors from 'cors'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'

const app = express()

connectDB();

(async () => {
  await seed()
})()

app.use(helmet())
app.use(mongoSanitize())
app.use(cors())
app.use([express.json(), express.urlencoded({ extended:true })])
app.use(apiRouter)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  handleError(err, res)
})

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`)
})