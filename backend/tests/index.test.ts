import { dbConnect, dbDisconnect } from './mocks/dbConnect'
import { usersSuite } from './users'
import { transactionsSuite } from './transactions'

describe('run integration test sequentially', () => {
  beforeAll(async () => await dbConnect())
  afterAll(async () => await dbDisconnect())
  
  usersSuite()
  transactionsSuite()
})
