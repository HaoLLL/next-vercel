import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/user'
import { UserAuth } from './entity/userAuth'

// const type = process.env.DATABASE_TYPE as 'mysql'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [User, UserAuth],
})
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
