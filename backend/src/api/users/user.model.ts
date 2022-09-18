import { prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import Transaction from '../transactions/transaction.model'

export default class User extends TimeStamps {
  @prop({ required: true })
  name!: string

  @prop({ required: true, unique: true })
  accNumber!: number
  
  @prop({ required: true, default: 0})
  balance!: number

  @prop({ ref: () => Transaction })
  userTransactions?: Ref<Transaction>[]
}
