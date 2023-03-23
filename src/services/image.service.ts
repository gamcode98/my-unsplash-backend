import { PaginateResult, Types } from 'mongoose'
import { DeleteResult } from '../interfaces/delete-result'
import { ImageDocument } from '../interfaces/image-paginate.interface'
import { Image } from '../interfaces/image.interface'
import { Options } from '../interfaces/options.interface'
import ImageModel from '../models/image.model'

const saveImage = async (image: Image): Promise<Image> => {
  const result = await ImageModel.create({ ...image })
  return result
}

const getImages = async (options: Options, userId: Image['userId']):
Promise<PaginateResult<ImageDocument & { _id: Types.ObjectId }>> => {
  const results = await ImageModel.paginate({ userId }, options)
  return results
}

const deleteImage = async (id: string): Promise<DeleteResult> => {
  const result = await ImageModel.deleteOne({ _id: id })
  return result
}

const deleteAllImagesFromOneUser = async (userId: string): Promise<DeleteResult> => {
  const result = await ImageModel.deleteMany({ userId })
  return result
}

export { saveImage, getImages, deleteImage, deleteAllImagesFromOneUser }
