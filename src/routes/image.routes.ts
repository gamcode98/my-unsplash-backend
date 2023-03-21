import { Router } from 'express'
import { getImagesCtrl, saveImageCtrl } from '../controllers/image.controller'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import { saveImageSchema } from '../schemas/image.schema'

const router = Router()

router.post(
  '/',
  checkJwt,
  validatorHandler(saveImageSchema, 'body'),
  saveImageCtrl
)

router.get(
  '/',
  checkJwt,
  getImagesCtrl
)

export default router
