import { Router } from 'express'
import { deleteImageCtrl, getImagesCtrl, saveImageCtrl } from '../controllers/image.controller'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import { deleteOneImageSchema, saveImageSchema } from '../schemas/image.schema'

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

router.delete(
  '/:_id',
  checkJwt,
  validatorHandler(deleteOneImageSchema, 'params'),
  deleteImageCtrl
)

export default router
