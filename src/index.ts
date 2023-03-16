import express from 'express'
import morgan from 'morgan'
import { config } from './config'
import { connection } from './config/db'
import routerApi from './routes/index'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'

void connection()

const app = express()

app.use(morgan('dev'))
app.use(express.json())

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(config.port, () =>
  console.log(`Listening: ${config.backendUrl}:${config.port} - 🚀`)
)
