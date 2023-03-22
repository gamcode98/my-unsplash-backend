/* eslint-disable no-useless-escape */
import Joi from 'joi'

const _id = Joi.string().hex().length(24)
const label = Joi.string()
const imageUrl = Joi.string()
  .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\.~#?&\/\/=]*)/)
  .message('Must be a valid url')

const saveImageSchema = Joi.object({
  label: label.required(),
  imageUrl: imageUrl.required()
})

const deleteOneImageSchema = Joi.object({
  _id: _id.required()
})

export { saveImageSchema, deleteOneImageSchema }
