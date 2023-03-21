import { PaginateResult, Types } from 'mongoose'
import { ImageDocument } from '../interfaces/image-paginate.interface'
import { Image } from '../interfaces/image.interface'
import { Options } from '../interfaces/options.interface'
import ImageModel from '../models/image.model'

const saveImage = async (image: Image): Promise<Image> => {
  const result = await ImageModel.create(image)
  return result
}

const getImages = async (options: Options, userId: Image['userId']):
Promise<PaginateResult<ImageDocument & { _id: Types.ObjectId }>> => {
  const results = await ImageModel.paginate({ userId }, options)
  return results
}

export { saveImage, getImages }
