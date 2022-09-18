import { UserModel, TransactionModel } from "../api/models"
import mongoose from 'mongoose'

export default async () => {
  await UserModel.deleteMany({})
  await UserModel.insertMany([
    {
      _id: new mongoose.Types.ObjectId('5a934e000102030405000000'),
      name: 'John Smith',
      balance: 500,
      accNumber: 123456
    },
    {
      _id: new mongoose.Types.ObjectId('629eb22698df1015e980a98f'),
      name: 'Jack Doe',
      balance: 500,
      accNumber: 874625
    }
  ])
  await TransactionModel.deleteMany({})
}