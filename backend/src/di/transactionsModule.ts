
import { ContainerModule } from 'inversify'
import TransactionsController from '../api/transactions/transactions.controller'
import TransactionsRepository from '../api/transactions/transactions.repository'
import TransactionsService from '../api/transactions/transactions.service'
import { TransactionModel } from '../api/models'
  
const transactionsModule = new ContainerModule(bind => {
  bind<TransactionsService>(TransactionsService).toSelf()
  bind<TransactionsController>(TransactionsController).toSelf()
  bind<TransactionsRepository>(TransactionsRepository).toSelf()
  bind<typeof TransactionModel>(TransactionModel).toFunction(TransactionModel)
})

export {
  transactionsModule
}
