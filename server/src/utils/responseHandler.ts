import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import dotenv from 'dotenv'
dotenv.config()

const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const sendSuccess = (res: Response, status: number = 200, message: string) => {
  res.status(status).json({
    success: true,
    message,
  })
}

export const sendResponse = (res: Response, status: number = 200, data: any, message: string, extra: any = null) => {
  if (extra === null) {
    res.status(status).json({
      success: true,
      data,
      message,
    })
  } else {
    res.status(status).json({
      success: true,
      data,
      extra,
      message,
    })
  }
}

export const sendError = (res: Response, status: number = 200, message: string) => {
  res.status(status).json({
    success: false,
    message,
  })
}

export const sendValidation = (req: Request, res: Response): boolean => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    sendError
    res.status(400).json({
      success: false,
      validation: errors.array(),
      message: `${capitalizeFirstLetter(errors.array()[0].param)} invalid.`,
    })
    return false
  }
  return true
}

export const sendException = (props: any) => {
  if (process.env.SETUP_MESSAGE === 'production') return 'Something went wrong.'
  return props
}
