import { Response, Request, NextFunction } from 'express'
import { injectable } from 'inversify'
import TransactionsService from './transactions.service'
import { ITransactionRequest } from './types'

@injectable()
class TransactionsController {
  private transactionsService: TransactionsService

  constructor(transactionsService: TransactionsService) {
    this.transactionsService = transactionsService
  }

  async makeTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { fromUser, toUser, amount, description } : ITransactionRequest = req.body

      res.send(await this.transactionsService.makeTransaction({
        fromUser,
        toUser,
        description,
        amount
      }))

      return
    } catch (error) {
      next(error)
    }
  }
}

export default TransactionsController
