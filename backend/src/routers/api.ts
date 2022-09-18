
import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import container from '../di/container'
import UsersController from '../api/users/users.controller'
import TransactionsController from '../api/transactions/transactions.controller'
import { validateTransaction } from '../middleware/validations'

const router = express.Router()
const UserCont = container.resolve(UsersController)
const TransactionsCont = container.resolve(TransactionsController)

router.get('/users', (_req: Request, res: Response, next: NextFunction) => UserCont.getAllUsers(res, next))

router.post(
  '/transaction',
  validateTransaction,
  (req: Request, res: Response, next: NextFunction) => TransactionsCont.makeTransaction(req, res, next)
)

export default router
