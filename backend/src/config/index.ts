import 'dotenv/config' 

export default {
  port: Number(process.env.PORT),
  mongoUser: process.env.MONGO_INITDB_ROOT_USERNAME,
  mongoPs: process.env.MONGO_INITDB_ROOT_PASSWORD,
  mongoDb: process.env.MONGO_INITDB_ROOT_DB
}
