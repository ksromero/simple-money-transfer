import { prop } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit'
}

export default class Transaction extends TimeStamps {
  @prop({ required: true })
  description!: string
  
  @prop({ required: true, default: 0 })
  amount!: number

  @prop({ required: true, enum: TransactionType})
  type!: TransactionType
}
