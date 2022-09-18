import { BeAnObject, IObjectWithTypegooseFunction } from '@typegoose/typegoose/lib/types'
import { Types, Document } from 'mongoose'
import User from '../users/user.model'
import { TransactionType } from './transaction.model'

type UserDocument = Document<any, BeAnObject, User> & User & IObjectWithTypegooseFunction & {
  _id: Types.ObjectId;
}

export interface ITransactionRequest {
  fromUser: number,
  toUser: number,
  amount: number,
  description: string
}

export interface ITransactionInfo {
  user: UserDocument,
  transactionType: TransactionType,
  description: string,
  amount: number,
  newBalance: number
}
