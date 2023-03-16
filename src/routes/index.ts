import { Router, Application } from 'express'
import authRouter from './auth.routes'

const routerApi = (app: Application): void => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
}

export default routerApi
