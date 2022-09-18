import { TransactionModel } from '../models'
import { inject, injectable } from 'inversify'
import { ReturnModelType } from '@typegoose/typegoose'
import BaseRepo from '../../shared/base.repository'

@injectable()
class TransactionsRepository extends BaseRepo<typeof TransactionModel>{

  public userModel!: ReturnModelType<typeof TransactionModel>

  constructor(@inject(TransactionModel) userModel: ReturnModelType<typeof TransactionModel>) {
    super(userModel)
  }
}

export default TransactionsRepository
