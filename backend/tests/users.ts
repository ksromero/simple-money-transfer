import mongoose from 'mongoose'
import { UserModel } from '../src/api/models'
import UsersService from '../src/api/users/users.service'
import container from '../src/di/container'
import { AppError } from '../src/shared/app.error'

const usersService = container.resolve(UsersService)

export const usersSuite = () => {
  describe('Users tests', () => {
    beforeAll(async () => {
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
    })

    it('can get all users', async () => {
      const users = await usersService.getAllUsers()

      expect(users).toHaveLength(2)
      expect(Array.isArray(users)).toEqual(true)
    })
    
    it('can get user by account number', async () => {
      const user = await usersService.getUserByAccNo(123456)

      expect(user.name).toEqual('John Smith')
      expect(user.balance).toEqual(500)
    })

    it('cannot get user if account number is wrong', async () => {
      try {
        await usersService.getUserByAccNo(1234562)
      } catch (err) {
        if (err instanceof AppError) {
          expect(err.message).toEqual(`User does not exist`)
        }
      }
    })
  })
}
