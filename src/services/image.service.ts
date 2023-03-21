import { Image } from '../interfaces/image.interface'
import ImageModel from '../models/image.model'

const saveImage = async (image: Image): Promise<Image> => {
  const result = await ImageModel.create(image)
  return result
}

export { saveImage }
