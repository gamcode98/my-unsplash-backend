import { Schema, model } from 'mongoose'
import { Image } from '../interfaces/image.interface'

const ImageSchema = new Schema<Image>(
  {
    label: { type: String },
    photoUrl: { type: String },
    userId: { type: String }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const ImageModel = model('images', ImageSchema)

export default ImageModel
