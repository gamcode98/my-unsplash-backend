import { Router } from 'express'
import {
  changePassword,
  login,
  recoveryPassword,
  register,
  validate
} from '../controllers/auth.controller'
import checkJwt from '../middlewares/session.handler'
import validatorHandler from '../middlewares/validator.handler'
import {
  changePasswordUserSchema,
  createUserSchema,
  loginUserSchema,
  recoveryUserSchema
} from '../schemas/user.schema'

const router = Router()

router.post('/register', validatorHandler(createUserSchema, 'body'), register)

router.post('/login', validatorHandler(loginUserSchema, 'body'), login)

router.post(
  '/recovery',
  validatorHandler(recoveryUserSchema, 'body'),
  recoveryPassword
)

router.post(
  '/change-password',
  validatorHandler(changePasswordUserSchema, 'body'),
  changePassword
)

router.get(
  '/validate',
  checkJwt,
  validate
)

export default router
