import 'reflect-metadata'
import { DataSource } from 'typeorm'
// 先引入manytoone的部分
import { Comment } from './entity/comment'
import { Article } from './entity/article'
import { User } from './entity/user'
import { UserAuth } from './entity/userAuth'
import { Tag } from './entity/tag'

// const type = process.env.DATABASE_TYPE as 'mysql'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  entities: [User, UserAuth, Article, Comment, Tag],
})

export const initDB = async () => {
  const db = AppDataSource.isInitialized
    ? AppDataSource
    : await AppDataSource.initialize()
  return db
}
