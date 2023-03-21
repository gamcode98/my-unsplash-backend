import { Schema, model, PaginateModel } from 'mongoose'
import { Image } from '../interfaces/image.interface'
import mongoosePaginate from 'mongoose-paginate-v2'
import { ImageDocument } from '../interfaces/image-paginate.interface'

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

ImageSchema.plugin(mongoosePaginate)

const ImageModel = model<ImageDocument, PaginateModel<ImageDocument>>('images', ImageSchema)

export default ImageModel
