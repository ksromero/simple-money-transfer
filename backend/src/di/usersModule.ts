
import { ContainerModule } from 'inversify'
import UsersController from '../api/users/users.controller'
import UsersRepository from '../api/users/users.repository'
import UsersService from '../api/users/users.service'
import { UserModel } from '../api/models'
  
const usersModule = new ContainerModule(bind => {
  bind<UsersService>(UsersService).toSelf()
  bind<UsersController>(UsersController).toSelf()
  bind<UsersRepository>(UsersRepository).toSelf()
  bind<typeof UserModel>(UserModel).toFunction(UserModel)
})

export {
  usersModule
}
