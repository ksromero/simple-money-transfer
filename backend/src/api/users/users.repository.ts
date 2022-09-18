import { UserModel } from '../models'
import { inject, injectable } from 'inversify'
import { ReturnModelType } from '@typegoose/typegoose'
import BaseRepo from '../../shared/base.repository'

@injectable()
class UsersRepository extends BaseRepo<typeof UserModel>{

  public userModel!: ReturnModelType<typeof UserModel>

  constructor(@inject(UserModel) userModel: ReturnModelType<typeof UserModel>) {
    super(userModel)
  }
}

export default UsersRepository