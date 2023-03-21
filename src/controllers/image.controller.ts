import { NextFunction, Response } from 'express'
import { asyncHandler } from '../middlewares/async.handler'
import { RequestExt } from '../interfaces/request-ext'
import { saveImage } from '../services/image.service'

const saveImageCtrl = asyncHandler(async ({ user, body }: RequestExt, res: Response, next: NextFunction): Promise<void> => {
  const response = await saveImage({ ...body, userId: user?.id })

  res.status(201).send({
    statusCode: res.statusCode,
    error: false,
    message: 'Image saved successfully',
    response
  })
})

export { saveImageCtrl }
