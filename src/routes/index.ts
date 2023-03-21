import { Router, Application } from 'express'
import authRouter from './auth.routes'
import imageRouter from './image.routes'

const routerApi = (app: Application): void => {
  const router = Router()

  app.use('/api/v1', router)

  router.use('/auth', authRouter)
  router.use('/images', imageRouter)
}

export default routerApi
