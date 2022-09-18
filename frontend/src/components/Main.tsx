import { Grid } from '@mantine/core'
import Transaction from './Transaction'
import { useStore } from '../store'
import { useEffect } from "react"

const Main = () => {
  const { getUsers, users } = useStore()

  useEffect(() => {
    getUsers()
  }, [ getUsers ])

  const rows = users?.map((user) => (
    <Grid.Col md={6} lg={6} key={ user._id }>
      <Transaction
        name= { user.name }
        balance= { user.balance }
        accNumber= { user.accNumber }
        toUser= { user.accNumber === 123456 ? 874625 : 123456 }
        userTransactions= { user.userTransactions }
      />
    </Grid.Col>
  ));

  return (
    <Grid>
      { rows }
    </Grid>
  )
}

export default Main