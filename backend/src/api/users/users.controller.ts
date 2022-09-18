import { Response, NextFunction } from 'express'
import { injectable } from 'inversify'
import UsersService from './users.service'

@injectable()
class UsersController {
  private usersService: UsersService

  constructor(usersService: UsersService) {
    this.usersService = usersService
  }

  async getAllUsers(res: Response, next: NextFunction) {
    try {
      res.send(await this.usersService.getAllUsers())

      return
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController
