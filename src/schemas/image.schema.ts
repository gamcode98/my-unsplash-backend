/* eslint-disable no-useless-escape */
import Joi from 'joi'

const label = Joi.string()
const imageUrl = Joi.string()
  .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\.~#?&\/\/=]*)/)
  .message('Must be a valid url')

const saveImageSchema = Joi.object({
  label: label.required(),
  imageUrl: imageUrl.required()
})

export { saveImageSchema }
