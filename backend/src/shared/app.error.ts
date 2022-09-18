import { Response } from 'express'

export enum ErrorCode {
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500
}

export const handleError = (err: Error, res: Response) => {
  if (err instanceof AppError) {
    if (err.isOperational === false) {
      process.exit(1)
    }
  
    return res.status(err.code).send(err.message)
  }

  return res.status(500).send(err.stack)
}

export class AppError extends Error {
  public readonly code: number
  public readonly isOperational: boolean
  
  constructor(
    code: number,
    message: string,
    isOperational:boolean = true,
    stack: string = ''
  ) {
    super(message)
    this.code = code
    this.isOperational = isOperational
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
