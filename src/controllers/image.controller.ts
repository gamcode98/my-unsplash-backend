import { NextFunction, Response } from 'express'
import { asyncHandler } from '../middlewares/async.handler'
import { RequestExt } from '../interfaces/request-ext'
import { getImages, saveImage } from '../services/image.service'
import { config } from '../config'

const saveImageCtrl = asyncHandler(async ({ user, body }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const response = await saveImage({ ...body, userId: user?.id })

  res.status(201).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Image saved successfully',
    response
  })
})

const getImagesCtrl = asyncHandler(async ({ user, query }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const { limit = 1, offset = 0 } = query

  const options = {
    limit: +limit <= 0 ? 10 : +limit,
    offset: +offset < 0 ? 0 : +offset
  }

  const { docs, prevPage, nextPage, offset: offsetResponse } = await getImages(options, user?.id)

  const prevOffset = offsetResponse - 10
  const nextOffset = offsetResponse + 10

  res.status(200).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Results',
    response: {
      content: docs,
      prevPage: `${prevPage === null ? null : config.backendUrl + '/api/v1/results?limit=' + options.limit + '&offset=' + prevOffset}`,
      nextPage: `${nextPage === null ? null : config.backendUrl + '/api/v1/results?limit=' + options.limit + '&offset=' + nextOffset}`
    }
  })
})

export { saveImageCtrl, getImagesCtrl }
