import { injectable } from 'inversify'
import UsersRepository from './users.repository'
import { ErrorCode, AppError } from '../../shared/app.error'

@injectable()
class UsersService {
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async getAllUsers() {
    return await this.usersRepository.find().populate({
      path: 'userTransactions',
      model: 'Transaction'
    }).lean()
  }

  async getUserByAccNo(accNumber: number) {
    const user = await this.usersRepository.findOne({ accNumber })

    if (user === null) {
      throw new AppError(ErrorCode.OK, 'User does not exist')
    }

    return user
  }
}

export default UsersService