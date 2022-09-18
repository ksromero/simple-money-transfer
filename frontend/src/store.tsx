import create from 'zustand'

const URL = 'http://localhost:4000'

export interface ITransaction {
  _id: string,
  description: string,
  amount: number,
  type: string,
  createdAt: Date,
  updatedAt: Date
}

export interface IUser {
  _id?: string,
  name: string,
  accNumber: number,
  balance: number,
  toUser: number,
  userTransactions: ITransaction[],
  createdAt?: Date,
  updatedAt?: Date
}

export interface ITransactionRequest {
  amount: number | null | undefined,
  description: string,
  fromUser: number,
  toUser: number
}

type Store = {
  users: IUser[]
  getUsers: () => void
  makeTransaction: (request: ITransactionRequest) => Promise<Response>
}

export const useStore = create<Store>((set) => ({
  users: [],
  getUsers: async () => {
    const response = await fetch(`${URL}/users`)
    const users = await response.json() as IUser[]

    set((state) => ({
      ...state,
      users
    }))
  },
  makeTransaction: async ({ amount, description, fromUser, toUser }) => {
    if (amount === null) {
      amount = undefined
    }

    return await fetch(`${URL}/transaction`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        description,
        fromUser,
        toUser
      })
    })
  }

}));