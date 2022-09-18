import { connection, connect } from 'mongoose'
import config from '../config'

export default () => {
    const connectDB = () => {
      connect(`mongodb://${config.mongoUser}:${config.mongoPs}@db:27017/${config.mongoDb}?authSource=admin`)
        .then(() =>{
          return console.info(`Successfully connected!`)
        })
        .catch(error => {
          console.error('Error connecting to database: ', error)

          return process.exit(1);
        })
    }

    connectDB()

    connection.on('disconnected', connectDB);
}