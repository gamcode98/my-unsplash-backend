import Joi from 'joi'

const id = Joi.string()
const email = Joi.string().email()
const registerPassword = Joi.string()
  .min(8)
  .max(16)
  .pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  )
  .message(
    '"password" must be a string with minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
  )
const loginPassword = Joi.string()
const password = Joi.string()
const token = Joi.string()
const oldPassword = Joi.string()
const newPassword = Joi.string()
  .min(8)
  .max(16)
  .pattern(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  )
  .message(
    '"password" must be a string with minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
  )

const createUserSchema = Joi.object({
  email: email.required(),
  password: registerPassword.required()
})

const loginUserSchema = Joi.object({
  email: email.required(),
  password: loginPassword.required()
})

const updateUserSchema = Joi.object({
  email
})

const getUserSchema = Joi.object({
  id: id.required()
})

const recoveryUserSchema = Joi.object({
  email: email.required()
})

const changePasswordUserSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required()
})

const changePasswordInSessionUserSchema = Joi.object({
  oldPassword: oldPassword.required(),
  newPassword: newPassword.required()
})

const deleteAccountSchema = Joi.object({
  password: password.required()
})

export {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  getUserSchema,
  recoveryUserSchema,
  changePasswordUserSchema,
  changePasswordInSessionUserSchema,
  deleteAccountSchema
}
