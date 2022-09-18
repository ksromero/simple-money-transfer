import TransactionsService from '../src/api/transactions/transactions.service'
import container from '../src/di/container'
import { AppError } from '../src/shared/app.error'

const transactionsService = container.resolve(TransactionsService)

export const transactionsSuite = () => {
  describe('Transactions tests', () => {
    it('can make a transaction', async () => {
      const transaction = await transactionsService.makeTransaction({
        fromUser: 123456,
        toUser: 874625,
        amount: 400,
        description: 'test'
      })

      expect(transaction).toEqual('Transaction is successfully completed!')
    })

    it('cannot make a transaction if amount is greater than the balance remaining', async () => {
      try {
        await transactionsService.makeTransaction({
          fromUser: 123456,
          toUser: 874625,
          amount: 400,
          description: 'test'
        })
      } catch (err) {
        if (err instanceof AppError) {
          expect(err.message).toEqual('Insufficient Balance!')
        }
      }
    })
  })
}
