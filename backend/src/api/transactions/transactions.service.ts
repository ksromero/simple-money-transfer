import { injectable } from 'inversify';
import TransactionsRepository from './transactions.repository'
import UsersService from '../users/users.service'
import { ITransactionRequest, ITransactionInfo } from './types'
import { TransactionType } from './transaction.model'
import { ErrorCode, AppError } from '../../shared/app.error'

@injectable()
class TransactionsService {
  private transactionsRepository: TransactionsRepository
  private usersService: UsersService

  constructor(
    transactionsRepository: TransactionsRepository,
    usersService: UsersService
  ) {
    this.transactionsRepository = transactionsRepository
    this.usersService = usersService
  }

  private async transact(transactionInfo: ITransactionInfo) {
    const createSenderTransact = await this.transactionsRepository.insert({
      description: transactionInfo.description,
      amount: transactionInfo.amount,
      type: transactionInfo.transactionType
    })

    await transactionInfo.user.updateOne({ 
      balance: transactionInfo.newBalance,
      $push: { userTransactions: createSenderTransact._id }
    })
  }

  async makeTransaction(transactionRequest: ITransactionRequest) {
    const [ sender, receiver ] = await Promise.all([
      this.usersService.getUserByAccNo(transactionRequest.fromUser),
      this.usersService.getUserByAccNo(transactionRequest.toUser)
    ])

    const senderBalance = sender.balance - transactionRequest.amount

    if (senderBalance < 0) {
      throw new AppError(ErrorCode.UNPROCESSABLE_ENTITY, 'Insufficient Balance!')
    }

    const receiverBalance = receiver.balance + transactionRequest.amount

    await Promise.all([
      this.transact({
        user: sender,
        transactionType: TransactionType.DEBIT,
        description: transactionRequest.description,
        amount: transactionRequest.amount,
        newBalance: senderBalance
      }),
      this.transact({
        user: receiver,
        transactionType: TransactionType.CREDIT,
        description: transactionRequest.description,
        amount: transactionRequest.amount,
        newBalance: receiverBalance
      })
    ])

    return 'Transaction is successfully completed!'
  }
}

export default TransactionsService