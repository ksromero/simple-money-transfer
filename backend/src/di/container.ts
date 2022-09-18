import { Container } from 'inversify'
import { usersModule } from './usersModule'
import { transactionsModule } from './transactionsModule'

const container = new Container()

container
  .load(
    usersModule,
    transactionsModule
  )

export default container