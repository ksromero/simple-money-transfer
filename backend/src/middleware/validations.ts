import { NextFunction, Request, Response }  from 'express'
import { z } from 'zod'

function validateTransaction(req: Request, res: Response, next: NextFunction){
  try {
    const Transaction = z.object({
      fromUser: z.number({
        required_error: 'From user is required',
        invalid_type_error: 'From user must be a number',
      }),
      toUser: z.number({
        required_error: 'To user is required',
        invalid_type_error: 'To user must be a number',
      }).nonnegative(),
      amount: z.number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      }).positive({ message: 'Amount must be greater than 0' }),
      description: z.string({
        required_error: 'Description required',
        invalid_type_error: 'Description must be a string',
      }).trim().min(1, {message: 'Description required'})
    })
  
    Transaction.parse(req.body)
  
    return next()
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).send(err.errors)
    }
  }
}

export {
  validateTransaction
}
