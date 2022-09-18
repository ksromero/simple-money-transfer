import { Card, Text, Group, Table, TextInput, Button, Grid, NumberInput } from '@mantine/core'
import { IUser, useStore } from '../store'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { z } from 'zod'
import { IconTransferIn } from '@tabler/icons'

const Transactions = ({ name, balance, accNumber, userTransactions, toUser }: IUser) => {
  const { makeTransaction, getUsers } = useStore()

  const form = useForm({
    initialValues: {
      amount: undefined,
      description: '',
      fromUser: accNumber,
      toUser
    }
  })

  const handleClick = async () => {
    const transaction = await makeTransaction(form.values)

    if (transaction.ok === false && transaction.status === 422) {
      return showNotification({
        color: 'red',
        title: 'Transaction Error!',
        message: `${await transaction.text()}`,
      })
    }

    if (transaction.ok === false && transaction.status === 400) {
      const errors = await transaction.json()
      
      return errors.map((error: z.ZodIssue) => 
        form.setFieldError(`${error.path}`, `${error.message}`)
      )
    }

    return getUsers()
  }
  
  let result

  if (userTransactions.length > 0) {
    result =
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
  
      <tbody>
        {
          userTransactions.map((transaction) => (
            <tr key={ transaction._id }>
              <td>{ new Date(transaction.createdAt).toLocaleDateString('en-AU') }</td>
              <td>{ transaction.description }</td>
              <td>{ transaction.type === 'debit' ? '- $' + transaction.amount.toFixed(2) : '+ $' + transaction.amount.toFixed(2) }</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  } else {
    result = <Text weight={500} align="center"> No Transactions Available </Text>
  }

  return (
    <Card
      shadow="md"
      p="sm"
      component="a"
      target="_blank"
    >
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={700}>{ name }</Text>
          <Text weight={700}> + ${  balance.toFixed(2) } </Text>
        </Group>

        <Text weight={400} mb="md"> Acc: { accNumber }</Text>

        <Grid grow gutter="xs">
          <Grid.Col span="auto">
            <NumberInput
              precision={2}
              placeholder="Amount $"
              hideControls
              { ...form.getInputProps('amount') }
            />
          </Grid.Col>

          <Grid.Col span={3}>
            <TextInput
              placeholder="Transfer description"
              { ...form.getInputProps('description') }
            />
          </Grid.Col>

          <Grid.Col span="auto">
            <Button leftIcon={<IconTransferIn/>} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} onClick={handleClick}>TRANSFER</Button>
          </Grid.Col>
        </Grid>
      </Card.Section>

      <Text weight={500} size="lg" mt="md" mb="md">
        Transactions
      </Text>

      <hr/>
      { result }
    </Card>
  )
}

export default Transactions