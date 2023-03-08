import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Article } from './entity/article'
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
  entities: [User, UserAuth,Article],
})

export const initDB = async()=>{
    const db = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize();
    return db;
}

