import { NextFunction, Request, Response } from 'express'
import {
  registerNewUser,
  findOneUserByEmail,
  updateOneUser,
  findOneUserById,
  deleteOneUser
} from '../services/user.service'
import { encrypt, verify } from '../utils/bcrypt.handler'
import { generateToken, verifyToken } from '../utils/jwt.handler'
import boom from '@hapi/boom'
import { config } from '../config'
import { sendEmail } from '../utils/email.handler'
import { UserDto } from '../dto/auth.dto'
import { asyncHandler } from '../middlewares/async.handler'
import { RequestExt } from '../interfaces/request-ext'
import { deleteAllImagesFromOneUser } from '../services/image.service'

const register = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = body

  const user = await findOneUserByEmail(email)

  if (user != null) throw boom.forbidden('User already registered')

  const passwordHash = await encrypt(password)

  const response = await registerNewUser({ email, passwordHash })

  res.status(201).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Registration successful',
    response
  })
})

const login = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = body

  const user = await findOneUserByEmail(email)

  if (user == null) throw boom.notFound('User not found')

  const isCorrect = await verify(password, user.password)

  if (!isCorrect) throw boom.unauthorized()

  const token = generateToken({ id: user._id })

  res.status(200).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Login successful',
    response: {
      user: {
        id: user._id,
        email: user.email
      },
      token
    }
  })
})

const recoveryPassword = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = body

  const user = await findOneUserByEmail(email)

  if (user == null) throw boom.notFound('User not found')

  const payload = { sub: user._id }

  const token = generateToken(payload, '15min')

  const link = `${config.frontendUrl}/recovery?token=${token}`

  await updateOneUser(user._id, { recoveryToken: token })

  const mail = {
    from: config.smtpEmail,
    to: `${user.email}`,
    subject: 'Email to recover password',
    html: `<b>Click <a href="${link}" target="_blank">here</a> to redirect the page</b>`
  }

  const response = await sendEmail(mail)

  res.status(200).send({
    statusCode: 200,
    message: response
  })
})

const changePassword = asyncHandler(async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token, newPassword } = body

  const payload = verifyToken(token)

  const { sub } = payload

  const user = await findOneUserById(sub as UserDto['_id'])

  if (user?.recoveryToken === null) throw boom.unauthorized()

  const passwordHash = await encrypt(newPassword)

  await updateOneUser(sub as UserDto['_id'], {
    recoveryToken: null,
    password: passwordHash
  })

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Password changed successfully'
  })
})

const updatePassword = asyncHandler(async ({ user, body }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const { oldPassword, newPassword } = body

  const userFound = await findOneUserById(user?.id)

  if (!userFound) throw boom.unauthorized()

  const isCorrect = await verify(oldPassword, userFound.password)

  if (!isCorrect) throw boom.unauthorized()

  const passwordHash = await encrypt(newPassword)

  await updateOneUser(user?.id, {
    password: passwordHash
  })

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'Password changed successfully'
  })
})

const deleteAccount = asyncHandler(async ({ user, body }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const { password } = body

  const userFound = await findOneUserById(user?.id)

  if (!userFound) throw boom.unauthorized()

  const isCorrect = await verify(password, userFound.password)

  if (!isCorrect) throw boom.unauthorized()

  await deleteAllImagesFromOneUser(user?.id)

  await deleteOneUser(user?.id)

  res.status(200).send({
    statusCode: res.statusCode,
    message: 'User deleted successfully'
  })
})

const validate = asyncHandler(async ({ user }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const userFound = await findOneUserById(user?.id)

  if (!userFound) throw boom.unauthorized()

  res.status(200).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Session validated',
    response: {
      user: {
        id: userFound._id,
        email: userFound.email
      }
    }
  })
})

export {
  register,
  login,
  recoveryPassword,
  changePassword,
  updatePassword,
  deleteAccount,
  validate
}
