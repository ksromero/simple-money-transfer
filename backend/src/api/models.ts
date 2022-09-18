import { getModelForClass } from '@typegoose/typegoose'
import User from './users/user.model'
import Transaction from './transactions/transaction.model'

const UserModel = getModelForClass(User)
const TransactionModel = getModelForClass(Transaction)

export {
  UserModel,
  TransactionModel
}
